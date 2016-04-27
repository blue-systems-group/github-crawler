import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Job } from 'meteor/vsivsi:job-collection';
import { repoJobs, Searchs } from '../../lib/collections';

Meteor.testClone = () => {
  Meteor.call('repos.add', {
    name: 'xcv58/startup-tools',
    url: 'https://github.com/xcv58/startup-tools',
  });
};

Meteor.cloneAll = () => {
  const cursor = Searchs.find();
  for (const search of cursor.fetch()) {
    for (const item of search.items) {
      const { repository: { full_name: name, html_url: url } } = item;
      console.log(name, url);
      Meteor.call('repos.add', { name, url });
    }
  }
};

repoJobs.events.on('jobDone', message => {
  const { params = [] } = message;
  const [_id, runId] = params;
  repoJobs.findOne({ _id, runId });
});

repoJobs.events.on('jobFail', message => {
  const { params = [] } = message;
  const [_id, runId] = params;
  repoJobs.findOne({ _id, runId });
});

export default function () {
  Meteor.methods({
    'repos.add'(repo) {
      check(repo, {
        name: String,
        url: String,
      });
      const job = new Job(repoJobs, 'clone', { ...repo });
      job.priority('normal')
      .retry({
        retries: 2,
        wait: 60 * 1000,
      })
      .save();
    },
  });
}
