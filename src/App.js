import React, { Component } from "react";
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import { Route } from "react-router-dom";
import ShowBookShelf from "./ShowBookShelf";
import SearchBooks from "./SearchBooks";

class BooksApp extends Component {
  state = {
    books: []
  };

  updateShelf = (b, s) => {
    BooksAPI.update(b, s).then(
      BooksAPI.getAll().then(books => {
        this.setState({
          books
        });
      })
    );
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        books
      });
    });
  }

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>

          <Route
            exact
            path="/"
            render={() => (
              <div className="list-books-content">
                <ShowBookShelf
                  shelfName="Currently Reading"
                  books={books.filter(
                    book => book.shelf === "currentlyReading"
                  )}
                  changeShelf={this.updateShelf}
                />
                <ShowBookShelf
                  shelfName="Want to read"
                  books={books.filter(book => book.shelf === "wantToRead")}
                  changeShelf={this.updateShelf}
                />
                <ShowBookShelf
                  shelfName="Read"
                  books={books.filter(book => book.shelf === "read")}
                  changeShelf={this.updateShelf}
                />
              </div>
            )}
          />
        </div>

        <Route
          exact
          path="/addBook"
          render={() => (
            <SearchBooks
              changeShelf={this.updateShelf}
              books={this.state.books}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
