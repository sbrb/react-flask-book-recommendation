from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

popular_df = pickle.load(open('popular.pkl', 'rb'))
pt = pickle.load(open('pt.pkl', 'rb'))
books = pickle.load(open('books.pkl', 'rb'))
similarity_scores = pickle.load(open('similarity_scores.pkl', 'rb'))

app = Flask(__name__)
CORS(app)


def convert_numpy_int64(item):
    if isinstance(item, np.int64):
        return int(item)
    elif isinstance(item, list):
        return [convert_numpy_int64(i) for i in item]
    elif isinstance(item, dict):
        return {k: convert_numpy_int64(v) for k, v in item.items()}
    return item


@app.route('/recommend', methods=['GET'])
def get_data():
    data = []
    for index, row in popular_df.iterrows():
        book_info = {
            'book_name': row['Book-Title'],
            'author': row['Book-Author'],
            'image': row['Image-URL-M'],
            'votes': convert_numpy_int64(row['num_ratings']),
            'rating': convert_numpy_int64(row['avg_rating'])
        }
        data.append(book_info)
    return jsonify(data)


@app.route('/recommend_books', methods=['POST'])
def recommend_books():
    user_input = request.json.get('user_input')

    # Check if the user's input exists in the "pt.index" array
    if user_input not in pt.index:
        error_message = f"Book '{user_input}' not found in the database."
        return jsonify({'error_message': error_message}), 404

    # Continue with the recommendation logic
    index = np.where(pt.index == user_input)[0]
    if len(index) == 0:
        error_message = f"Book '{user_input}' not found in the database."
        return jsonify({'error_message': error_message}), 404

    index = index[0]
    similar_items = sorted(enumerate(similarity_scores[index]), key=lambda x: x[1], reverse=True)[1:5]

    data = []
    for i, score in similar_items:
        temp_df = books[books['Book-Title'] == pt.index[i]]
        item = {
            'book_name': pt.index[i],
            'author': temp_df['Book-Author'].values[0],
            'image': temp_df['Image-URL-M'].values[0]
        }
        data.append(item)

    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
