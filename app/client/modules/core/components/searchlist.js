import React, { PropTypes } from 'react';

const SearchList = ({ searchs }) => (
  <div className="searchlist">
    <ul>
      {searchs.map(search => (
        <li key={search._id}>
          <a href={`/post/${search._id}`}>{search.title}</a>
        </li>
      ))}
    </ul>
  </div>
);

SearchList.propTypes = {
  searchs: PropTypes.array.isRequired,
};

export default SearchList;
