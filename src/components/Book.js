import React from 'react';
import PropTypes from 'prop-types';

// Enum for Shelf
export const ShelfEnum = {
    currentlyReading: 'Currently Reading',
    wantToRead: 'Want To Read',
    read: 'Read',
    none: 'None',
};

export default class Book extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shelf: props.shelf,
        };
    }

    onChangeShelf = e => {
        e.preventDefault();
        this.setState({shelf: e.target.value});
        this.props.changeShelf(this.props.id, e.target.value);
    };

    render() {
        const {cover, title, authors} = this.props;
        return (
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${cover})`
                        }}/>
                    <div
                        className="book-shelf-changer">
                        <select
                            value={this.state.shelf}
                            onChange={this.onChangeShelf}>
                            <option
                                value="move"
                                disabled>Move
                                to...
                            </option>
                            {Object.keys(ShelfEnum).map(shelf => (
                                <option key={shelf}
                                        value={shelf}>{ShelfEnum[shelf]}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div
                    className="book-title">{title}
                </div>
                <div
                    className="book-authors">{authors && authors.map(author => {
                    return (<span key={author}>{author}<br/></span>)
                })}
                </div>
            </div>
        )
    }
}

Book.propTypes = {
    id: PropTypes.string.isRequired,
    cover: PropTypes.string,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    changeShelf: PropTypes.func.isRequired,
};