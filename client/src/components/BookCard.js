import React from 'react';
import './BookCard.css'; // Import the CSS file

const BookCard = ({ image, bookName, author, votes, rating }) => {
    return (
        <div className="card">
            <div className="card-body">
                <img className="card-img-top" src={image} alt={bookName} />
                <p className="text-white">{bookName}</p>
                <h4 className="text-white">{author}</h4>
                <h4 className="text-white">Votes - {votes}</h4>
                <h4 className="text-white">Rating - {rating}</h4>
            </div>
        </div>
    );
};

export default BookCard;

