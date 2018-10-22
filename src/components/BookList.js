import React from 'react';
import PropTypes from 'prop-types';
import Book from "./Book";

const BookList = props => {
    return (
        <ol className="books-grid">
            {props.bookList.map(book => (
                <li>
                    <Book title={book.title}
                          author={book.author}
                          shelf={book.shelf}
                          cover={book.cover}
                    />
                </li>
            ))}
        </ol>
    )
};

BookList.propTypes = {
    bookList: PropTypes.array.isRequired,
};

export default BookList;