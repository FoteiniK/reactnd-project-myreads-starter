import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import BookLook from "./BookLook";

const ShowBookShelf = (props) => {


    this.changeShelf = (book, shelf) => {
        props.changeShelf(book, shelf);
    };

    const { books, shelfName } = props;

    return (
        <div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfName}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map(book => (
                            <BookLook
                                book={book}
                                key={book.id}
                                changeShelf={this.changeShelf}
                            />
                        ))}
                    </ol>
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">add book</Link>
            </div>
        </div>
    );
}

ShowBookShelf.propTypes = {
    books: propTypes.array.isRequired,
    changeShelf: propTypes.func.isRequired
};

export default ShowBookShelf;
