import React, { PropTypes } from 'react';

const Search = ({ search }) => (
  <div className="searchitem">
    {search.query}
  </div>
);

Search.propTypes = {
  search: PropTypes.object.isRequired,
};

export default Search;
