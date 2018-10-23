import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from "./components/Shelf";
import SearchBooks from "./components/SearchBooks";

class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: false,
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
                        console.log(res)
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

    showSearchPage = val => {
        this.setState(() => {
            return {
                showSearchPage: val,
                searchResults: [],
            };
        });
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
                {this.state.showSearchPage ? (
                    <SearchBooks
                        showSearchPage={this.showSearchPage}
                        searchQuery={this.searchBooks}
                        searchResults={this.state.searchResults}
                        addShelf={this.addToShelf}
                    />
                ) : (
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
                            <a onClick={() => this.setState({showSearchPage: true})}>Add
                                a book</a>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default BooksApp
