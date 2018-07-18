import React, { Component } from "react";
import "./App.css";
import * as BooksAPI from "./BooksAPI";
// import ShowBooks from "./ShowBooks";
import ShowBookShelf from "./ShowBookShelf";

class BooksApp extends Component {
  state = {
    books: []
  };
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        books
      });
      console.log(books);
    });
  }

  // updateShelf (x,y) {console.log(x.id,y)};
  //x is the book ,y is the shelf.id
  updateShelf = (x, y) => {
    console.log(x, y);

    BooksAPI.update(x, y);

    console.log(this.state);
  };

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>

          <div className="list-books-content">
            <ShowBookShelf
              shelfName="Currently Reading"
              books={books.filter(book => book.shelf === "currentlyReading")}
              shelf="currentlyReading"
              changeShelf={this.updateShelf}
            />

            <ShowBookShelf
              shelfName="Want to read"
              books={books.filter(book => book.shelf === "wantToRead")}
              shelf="wantToRead"
              changeShelf={this.updateShelf}
            />

            <ShowBookShelf
              shelfName="Read"
              books={books.filter(book => book.shelf === "read")}
              shelf="read"
              changeShelf={this.updateShelf}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BooksApp;
