import React, { Component } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import BookLook from "./BookLook";


class ShowBookShelf extends Component {
  static propTypes = {
    books: propTypes.array.isRequired,
    changeShelf: propTypes.func.isRequired
  };


  changeShelf = (book,shelf) => {
    this.props.changeShelf(book,shelf)
  }


  render() {
    const { books, shelfName } = this.props;
    

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
          <Link to="/addBook">add book</Link>
        </div>
      </div>
    );
  }
}

export default ShowBookShelf;
