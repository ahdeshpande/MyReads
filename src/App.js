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
        showSearchPage: true,
        books: [],
        searchResults: []
        // books: [
        //     {
        //         title: "To Kill a Mockingbird",
        //         author: "Harper Lee",
        //         shelf: "currentlyReading",
        //         cover: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
        //     },
        //     {
        //         title: "Ender's Game",
        //         author: "Orson Scott Card",
        //         shelf: "currentlyReading",
        //         cover: "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api",
        //     },
        //     {
        //         title: "1776",
        //         author: "David McCullough",
        //         shelf: "wantToRead",
        //         cover: "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api",
        //     },
        //     {
        //         title: "Harry Potter and the Sorcerer's Stone",
        //         author: "J. K. Rowling",
        //         shelf: "wantToRead",
        //         cover: "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api",
        //     },
        //     {
        //         title: "The Hobbit",
        //         author: "J.R.R. Tolkien",
        //         shelf: "read",
        //         cover: "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api",
        //     },
        //     {
        //         title: "Oh, the Places You'll Go!",
        //         author: "Seuss",
        //         shelf: "read",
        //         cover: "http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api",
        //     },
        //     {
        //         title: "The Adventures of Tom Sawyer",
        //         author: "Mark Twain",
        //         shelf: "read",
        //         cover: "http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api",
        //     },
        // ],
    };

    addToShelf = (id, shelf) => {
        if (this.state.books.filter(item => item.id === id).length === 0) {
            this.setState(() => {
                let book = this.state.searchResults.find(book => book.id === id);
                book.shelf = shelf;
                return {
                    books: [...this.state.books, book],
                };
            });
        } else {
            this.changeShelf(id, shelf);
        }
    };

    changeShelf = (id, shelf) => {

        this.setState(() => {
            return {
                books: this.state.books.map(book => {
                    if (book.id === id) {
                        book.shelf = shelf;
                        return book
                    } else {
                        return book
                    }
                }),
            };
        });
    };

    searchBooks = query => {

        if (query.trim().length > 0) {
            BooksAPI.search(query)
                .then(res => {

                    if (Array.isArray(res)) {
                        this.setState(() => {
                            return {
                                searchResults: res,
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
