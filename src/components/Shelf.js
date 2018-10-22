import React from 'react';
import PropTypes from 'prop-types';
import BookList from "./BookList";
import {ShelfEnum} from "./Book";

const Shelf = props => {

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{ShelfEnum[props.type]}</h2>
            <div className="bookshelf-books">

                <BookList bookList={props.bookList}
                          changeShelf={props.changeShelf}/>

            </div>
        </div>
    )
};

Shelf.propTypes = {
    type: PropTypes.string.isRequired,
    bookList: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired,
};

export default Shelf;