import React, { Component } from "react";
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import { Route } from "react-router-dom";
import ShowBookShelf from "./ShowBookShelf";
import SearchBooks from "./SearchBooks";
import { Switch } from "react-router";
import NoMatch from "./NoMatch";

class BooksApp extends Component {
  state = {
    books: []
  };
//updates shelf on main app's page
  updateShelf = (b, s) => {
    let selectedBook = this.state.books.filter(book => book === b);
    selectedBook[0].shelf = s;
    this.setState(state => ({
      books: state.books.filter(book => book !== b).concat(selectedBook[0])
    }));
  };

//adds book from search page to the correct shelf
  addBookToShelf = (b, s) => {
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
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
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
              </div>
            )}
          />
          <Route
            exact
            path="/search"
            render={() => (
              <SearchBooks
                changeShelf={this.addBookToShelf}
                books={this.state.books}
              />
            )}
          />
          {/* component if requested page doesn't exist */}
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
