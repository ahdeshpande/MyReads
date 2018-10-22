import React from 'react';
import PropTypes from 'prop-types';
import BookList from "./BookList";
import {ShelfEnum} from "./Book";

const Shelf = props => {

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{ShelfEnum[props.type]}</h2>
            <div className="bookshelf-books">

                <BookList bookList={props.bookList}/>

            </div>
        </div>
    )
};

Shelf.propTypes = {
    type: PropTypes.string.isRequired,
    bookList: PropTypes.array.isRequired,
};

export default Shelf;