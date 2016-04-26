import { repoJobs } from '../../lib/collections';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export default () => {
  Meteor.publish('allJobs', (userId) => {
    check(userId, null);
    const selector = {};
    const options = {};
    return repoJobs.find(selector, options);
  });
};
