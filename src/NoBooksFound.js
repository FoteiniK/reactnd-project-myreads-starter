import React, { Component } from "react";

class NoBooksFound extends Component {
  render() {
    return (
    <div className="no-results">
      <h3>Sorry,there is no book with such title or author</h3>
    </div>

    );
  }
}

export default NoBooksFound;
