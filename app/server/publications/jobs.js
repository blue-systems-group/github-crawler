import { repoJobs } from '../../lib/collections';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

const initJobs = () => {
  repoJobs.startJobServer();

  repoJobs.allow({
    admin() {
      return true;
    },
    manager() {
      return true;
    },
    jobRerun() {
      return true;
    },
    jobSave() {
      return true;
    },
    getWork() {
      return true;
    },
    worker() {
      return true;
    },
  });
};

export default () => {
  initJobs();

  Meteor.publish('allJobs', (userId) => {
    check(userId, null);
    const selector = {};
    const options = {};
    return repoJobs.find(selector, options);
  });
};
