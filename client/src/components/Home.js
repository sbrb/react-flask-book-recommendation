import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import '../styles.css';

const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/recommend')
            .then((response) => response.json())
            .then((data) => setBooks(data));
    }, []);
    // console.log(books)
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-white" style={{ fontSize: '50px' }}>
                        Top 50 Books
                    </h1>
                </div>
                <div className="book_container">
                    {Array.isArray(books) && books.length > 0 ? (
                        books.map((book, index) => (
                            <BookCard
                                key={index}
                                image={book.image}
                                bookName={book.book_name}
                                author={book.author}
                                votes={book.votes}
                                rating={book.rating}
                            />
                        ))
                    ) : (
                        <p className="text-white">Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
