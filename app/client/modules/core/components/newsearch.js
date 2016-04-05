import React, { Component, PropTypes } from 'react';

class NewSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.newSearch = this.newSearch.bind(this);
  }

  newSearch() {
    const { create } = this.props;
    const { input } = this.refs;
    create(input.value);
  }

  render() {
    const { error } = this.props;
    return (
      <div>
        {error ? <p style={{ color: 'red' }}>{error}</p> : null}
        <input ref="input"></input>
        <button onClick={this.newSearch}>New Search</button>
      </div>
    );
  }
}

NewSearch.propTypes = {
  error: PropTypes.string,
  create: PropTypes.func.isRequired,
};

export default NewSearch;
