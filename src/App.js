import React, { Component } from "react";
import "./App.css";
import * as BooksAPI from "./BooksAPI";
// import ShowBooks from "./ShowBooks";
import { Route } from "react-router-dom";
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

  updateShelf = (x, y) => {
    BooksAPI.update(x, y).then(
      BooksAPI.getAll().then(books => {
        console.log(books);
        this.setState({
          books
        });
      })
    );
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
            <Route
              exact
              path="/"
              render={() => (
                <ShowBookShelf
                  shelfName="Currently Reading"
                  books={books.filter(
                    book => book.shelf === "currentlyReading"
                  )}
                  changeShelf={this.updateShelf}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={() => (
                <ShowBookShelf
                  shelfName="Want to read"
                  books={books.filter(book => book.shelf === "wantToRead")}
                  changeShelf={this.updateShelf}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={() => (
                <ShowBookShelf
                  shelfName="Read"
                  books={books.filter(book => book.shelf === "read")}
                  changeShelf={this.updateShelf}
                />
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BooksApp;
