import { Searchs } from '../../lib/collections';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export default () => {
  Meteor.publish('searchs.list', () => {
    const selector = {};
    const options = {
      fields: { _id: 1, query: 1, searching: 1, createdAt: 1, totalCount: 1, 'items.name': 1 },
      sort: { createdAt: -1 },
      // limit: 10,
    };

    return Searchs.find(selector, options);
  });

  Meteor.publish('searchs.single', (searchId) => {
    check(searchId, String);
    const selector = { _id: searchId };

    return Searchs.find(selector);
  });

  // Meteor.publish('posts.comments', function (postId) {
  //   check(postId, String);
  //   const selector = {postId};
  //   return Comments.find(selector);
  // });
};
