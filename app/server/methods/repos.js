import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Job } from 'meteor/vsivsi:job-collection';
import { repoJobs } from '../../lib/collections';

export default function () {
  Meteor.methods({
    'repos.add'(repo) {
      check(repo, String);
      const job = new Job(repoJobs, 'new', { repo });
      job.priority('normal')
      .retry({
        retries: 5,
        wait: 60 * 1000,
      })
      .save();
    },
  });
}
