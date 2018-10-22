import React from 'react';
import PropTypes from 'prop-types';
import Book, {ShelfEnum} from "./Book";

const BookList = props => {
    return (
        <ol className="books-grid">
            {props.bookList.map(book => (
                <li key={book.id}>
                    <Book id={book.id}
                          title={book.title}
                          authors={book.authors}
                          shelf={book.shelf !== undefined ? book.shelf : Object.keys(ShelfEnum)[Object.keys(ShelfEnum).length - 1]}
                          cover={book.imageLinks.thumbnail}
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