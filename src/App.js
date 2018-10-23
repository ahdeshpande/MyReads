import React from 'react';
import * as BooksAPI from './BooksAPI';
import {Link, Route} from 'react-router-dom';
import './App.css';
import Shelf from "./components/Shelf";
import SearchBooks from "./components/SearchBooks";

class BooksApp extends React.Component {
    state = {
        books: [],
        searchResults: [],
    };

    addToShelf = (book, shelf) => {
        if (this.state.books.filter(item => item.id === book.id).length === 0) {
            BooksAPI.update(book, shelf)
                .then(
                    this.setState(() => {
                        book.shelf = shelf;
                        return {
                            books: [...this.state.books, book],
                        };
                    }))
                .catch(error => (
                    console.log(error)
                ));
        } else {
            this.changeShelf(book, shelf);
        }
    };

    changeShelf = (book, shelf) => {

        BooksAPI.update(book, shelf)
            .then(
                this.setState(() => {
                    return {
                        books: this.state.books.map(item => {
                            if (item.id === book.id) {
                                item.shelf = shelf;
                                return item
                            } else {
                                return item
                            }
                        }),
                    };
                }))
            .catch(error => (
                console.log(error)
            ));
    };

    searchBooks = query => {

        if (query.trim().length > 0) {
            BooksAPI.search(query)
                .then(res => {

                    if (Array.isArray(res)) {
                        this.setState(() => {
                            return {
                                searchResults: res.map(item => {
                                    const book = this.state.books.find(b => b.id === item.id);
                                    if (book === undefined) {
                                        return item;
                                    } else {
                                        return book;
                                    }
                                }),
                            };
                        });
                    } else {
                        this.setState(() => {
                            return {
                                searchResults: [],
                            };
                        });
                    }
                })
                .catch(error => (
                    console.log(error)
                ))
        } else {
            this.setState(() => {
                return {
                    searchResults: [],
                };
            });
        }

    };

    componentDidMount = () => {

        BooksAPI.getAll()
            .then(res => {
                this.setState(() => {
                    return {
                        books: res,
                    };
                });
            })
            .catch(error => console.log(error))

    };

    render() {
        return (
            <div className="app">
                <Route exact path='/search' render={() => (
                    <SearchBooks
                        searchQuery={this.searchBooks}
                        searchResults={this.state.searchResults}
                        addShelf={this.addToShelf}
                    />
                )}/>

                <Route exact path='/' render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <Shelf type="currentlyReading"
                                       bookList={this.state.books.filter(book => book.shelf === 'currentlyReading')}
                                       changeShelf={this.changeShelf}/>

                                <Shelf type="wantToRead"
                                       bookList={this.state.books.filter(book => book.shelf === 'wantToRead')}
                                       changeShelf={this.changeShelf}/>

                                <Shelf type="read"
                                       bookList={this.state.books.filter(book => book.shelf === 'read')}
                                       changeShelf={this.changeShelf}/>

                            </div>
                        </div>
                        <div className="open-search">
                            <Link to="/search" onClick={() => {
                                this.setState({searchResults: []})
                            }}>Add a book</Link>
                        </div>
                    </div>
                )}/>

            </div>
        )
    }
}

export default BooksApp
