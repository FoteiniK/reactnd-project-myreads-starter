import React, { Component } from "react";
// import { Link } from "react-router-dom";
import propTypes from "prop-types";
// import BookLook from "./BookLook";
// import * as BooksAPI from "./BooksAPI";

class ShowBookShelf extends Component {
  static propTypes = {
    books: propTypes.array.isRequired,
    changeShelf: propTypes.func.isRequired
  };

  render() {
    const { books, shelfName } = this.props;
    console.log(books);

    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{shelfName}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {/* {books.map(book => (
                <BookLook
                  book={book}
                  key={book.id}
                   changeshelf={this.updateShelf}
                /> */}
              {/* ))} */}
              {books.map(book => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${
                            book.imageLinks.smallThumbnail
                          })`
                        }}
                      />
                      <div className="book-shelf-changer">
                        <select
                          value={book.shelf}
                          onChange={event =>
                            this.props.changeShelf(book, event.target.value)
                          }
                        >
                          <option value="move" disabled>
                            Move to...
                          </option>
                          <option value="currentlyReading">
                            Currently Reading
                          </option>
                          <option value="wantToRead"> Want to Read</option>
                          <option value="read"> Read</option>
                          <option value="none"> None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowBookShelf;
