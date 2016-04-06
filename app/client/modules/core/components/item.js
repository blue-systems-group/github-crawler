import React, { PropTypes } from 'react';

const Item = ({ index, path, score, html_url: url, text_matches, repository = {} }) => {
  const { html_url: repoUrl, full_name: repoName } = repository;
  return (
    <div className="item">
      <div>
        {index + 1}: <a href={repoUrl} target="_blank">{repoName}</a> {score}
      </div>
      <a href={url} target="_blank">
        {path}
      </a>
      <div>Matched times: {text_matches.length}</div>
    </div>
  );
};

Item.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  html_url: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  text_matches: PropTypes.array.isRequired,
  repository: PropTypes.object.isRequired,
};

export default Item;
