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
        <div className="todoapp">
          <h1>GitHub Code Search</h1>
          <div className="search-form">
            <input ref="input" className="new-search" placeholder="new GitHub search"></input>
            <input type="button" className="button" onClick={this.newSearch} value="Search"></input>
          </div>
        </div>
      </div>
    );
  }
}

NewSearch.propTypes = {
  error: PropTypes.string,
  create: PropTypes.func.isRequired,
};

export default NewSearch;
