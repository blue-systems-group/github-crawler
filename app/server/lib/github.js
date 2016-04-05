import { Meteor } from 'meteor/meteor';
import { Searchs } from '../../lib/collections';
import rp from 'request-promise';

const { floor, max } = Math;

const getResetSeconds = (resetTime) => {
  const now = floor(Number(new Date()) / 1000);
  return max((resetTime - now) * 1000, 0);
};

const finishSearch = (_id) => Searchs.update(
  _id,
  { $set: { searching: false } }
);

const endpoint = 'https://api.github.com/search/code';
const token = Meteor.settings.GITHUB_TOKEN;
const PER_PAGE = 100;

const searchCode = ({ _id, query }, page = 1) => {
  // const uri = `${endpoint}?q=${query}&per_page=100&page=${page}`;
  if (page > 10) {
    return finishSearch(_id);
  }

  const uri = `${endpoint}?q=${query}&per_page=${PER_PAGE}&page=${page}`;
  const options = {
    uri,
    headers: {
      Authorization: `token ${token}`,
      'User-Agent': 'maybe',
    },
    resolveWithFullResponse: true,
    json: true,
  };

  rp(options)
  .then(Meteor.bindEnvironment((response) => {
    const { body, headers } = response;
    const {
      // 'x-ratelimit-limit': limit,
      'x-ratelimit-remaining': remain,
      'x-ratelimit-reset': resetTime,
    } = headers;

    const { total_count: totalCount, items } = body;
    Searchs.update(
      _id,
      { $push: { items: { $each: items } } }
    );

    if (totalCount <= page * PER_PAGE) {
      return finishSearch(_id);
    }

    if (remain === 0) {
      const wait = getResetSeconds(resetTime);
      return Meteor.setTimeout(() => {
        searchCode({ _id, query }, page + 1);
      }, wait);
    }
    return searchCode({ _id, query }, page + 1);
  }))
  .catch((err) => {
    // TODO: handle first time reach limit
    console.error(err);
  });

  return _id;
};

const gitHubSearch = ({ _id, query }) => {
  searchCode({ _id, query });
};

export { gitHubSearch };
