import React, { Component } from "react";
import noImgAvailable from "./icons/no_image_available.svg.png";

class BookLook extends Component {
  render() {
    const { book } = this.props;

    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover">
              {(book.imageLinks && (
                <img src={book.imageLinks.thumbnail} alt={book.title} />
              )) || <img src={noImgAvailable} alt={book.title} />}
            </div>

            <div className="book-shelf-changer">
              <select
                value={book.shelf || "none"}
                onChange={event =>
                  this.props.changeShelf(book, event.target.value)
                }
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead"> Want to Read</option>
                <option value="read"> Read</option>
                <option value="none"> None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {book.authors ? book.authors.join(", ") : ""}
          </div>
        </div>
      </li>
    );
  }
}
export default BookLook;
