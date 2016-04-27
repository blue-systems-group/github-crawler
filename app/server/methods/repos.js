import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Job } from 'meteor/vsivsi:job-collection';
import { repoJobs, upsertRepo } from '../../lib/collections';

/* eslint-disable no-console */
export default function () {
  Meteor.methods({
    'repos.add'(repo, options = {}) {
      check(repo, {
        name: String,
        url: String,
      });
      check(options, Object);
      if (upsertRepo(repo) || options.force) {
        console.log('create:', repo.name);
        const job = new Job(repoJobs, 'clone', { ...repo });
        job.priority('normal')
        .retry({
          retries: 2,
          wait: 60 * 1000,
        })
        .save();
      } else {
        console.log('skip:', repo.name);
      }
    },
  });
}
