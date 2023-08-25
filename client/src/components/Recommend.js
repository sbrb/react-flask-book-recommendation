import React, { useState } from 'react';
import BookCard from './BookCard';

const Recommend = () => {
    const [userInput, setUserInput] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(''); // Clear any previous error message
        fetch('http://127.0.0.1:5000/recommend_books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_input: userInput }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data && data.length > 0) {
                    setRecommendations(data);
                } else {
                    setError('No book recommendations found.');
                    setRecommendations([]); // Clear any existing recommendations
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setError('An error occurred while fetching book recommendations.');
                setRecommendations([]); // Clear any existing recommendations
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-white" style={{ fontSize: '50px' }}>
                        Recommend Books
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            name="user_input"
                            type="text"
                            className="form-control"
                            value={userInput}
                            onChange={handleInputChange}
                        />
                        <br />
                        <input type="submit" className="btn btn-lg btn-warning" />
                    </form>
                </div>
                <div className="book_container">
                    {error ? (
                        <p className="text-danger">{error}</p>
                    ) : (
                        recommendations.map((book, index) => (
                            <BookCard
                                key={index}
                                image={book.image}
                                bookName={book.book_name}
                                author={book.author}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Recommend;
