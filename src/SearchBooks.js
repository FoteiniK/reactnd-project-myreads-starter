import React, { Component } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import escapeRegExp from "escape-string-regexp";
import NoBooksFound from "./NoBooksFound";
import BookLook from "./BookLook";
import { DebounceInput } from "react-debounce-input";

class SearchBooks extends Component {
  static propTypes = {
    books: propTypes.array.isRequired,
    changeShelf: propTypes.func.isRequired
  };
  state = {
    query: "",
    books: [],
    results: ""
  };

//move the book to shelf
  changeShelf = (b, s) => {
    this.props.changeShelf(b, s);
     let selectedBook =
    this.state.books.filter(book => book === b)[0].shelf = s;
    this.setState(state => ({
      books: state.books.filter(book => book !== b).concat(selectedBook[0])
    }));
  };

  updateQuery = query => {
    this.setState({ query });
    const match = new RegExp(escapeRegExp(query), "i");
    if (query.length === 0) {
      this.setState({
        books: [],
        results: ""
      });
    } else if (query.length > 1) {
      BooksAPI.search(query).then(books => {
        if (books.length) {
          [...this.props.books, ...books]
            .filter(book => match.test(book.title) || match.test(book.author))
            .map(book =>
              this.props.books
                .filter(b => b.id === book.id)
                .map(b => (book.shelf = b.shelf))
            );
          this.setState({
            results: "",
            books
          });
        } else {
          this.setState({
            books: [],
            results: "no results"
          });
        }
      });
    }
  };

  render() {
    const { query, books } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            back
          </Link>

          <form className="search-books-input-wrapper">
            {/*
                 NOTES: The search from BooksAPI is limited to a particular set of search terms.
                 You can find these search terms here:
                 https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                 However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                 you don't find a specific author or title. Every search is limited by search terms.
               */}
            <DebounceInput
              onChange={event => this.updateQuery(event.target.value)}
              minLength={1}
              debounceTimeout={300}
              type="text"
              placeholder="Search by title or author"
              value={query}
            />
          </form>
        </div>
        <div className="search-books-results">
          {/* //diplays NoBooksFound component if there are no results matching */}
          {this.state.results === "no results" && <NoBooksFound />}
          <ol className="books-grid">
            {books.map(book => (
              <BookLook
                book={book}
                key={book.id}
                changeShelf={this.changeShelf}
                testshelf={this.testSelf}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
