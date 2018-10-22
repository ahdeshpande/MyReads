import React from 'react';
import PropTypes from 'prop-types';
import Book from "./Book";

const BookList = props => {
    return (
        <ol className="books-grid">
            {props.bookList.map(book => (
                <li key={book.title}>
                    <Book title={book.title}
                          author={book.author}
                          shelf={book.shelf}
                          cover={book.cover}
                          changeShelf={props.changeShelf}
                    />
                </li>
            ))}
        </ol>
    )
};

BookList.propTypes = {
    bookList: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired,
};

export default BookList;