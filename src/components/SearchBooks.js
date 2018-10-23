import React from 'react';
import PropTypes from 'prop-types';
import BookList from "./BookList";
import {Link} from "react-router-dom";

export default class SearchBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = e => {
        const {value} = e.target;
        this.setState(() => {
            return {
                query: value,
            };
        });
        this.props.searchQuery(value);
    };

    render() {
        const {searchResults, addShelf} = this.props;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search"
                          to="/">Close</Link>
                    <div className="search-books-input-wrapper">

                        <input type="text"
                               placeholder="Search by title or author"
                               value={this.state.query}
                               onChange={this.handleChange}/>

                    </div>
                </div>
                <div className="search-books-results">
                    <BookList bookList={searchResults}
                              changeShelf={addShelf}/>
                </div>
            </div>
        )
    }
}

SearchBooks.propTypes = {
    searchQuery: PropTypes.func.isRequired,
    addShelf: PropTypes.func.isRequired,
    searchResults: PropTypes.array,

};