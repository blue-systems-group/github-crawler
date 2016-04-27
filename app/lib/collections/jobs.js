import { Mongo } from 'meteor/mongo';
import { JobCollection as jobCollection } from 'meteor/vsivsi:job-collection';

const Repos = new Mongo.Collection('repos');

const repoJobs = jobCollection('repos');

const upsertRepo = ({ name, url }) => {
  if (Repos.findOne({ name, url })) {
    return false;
  }
  Repos.insert({ name, url });
  return true;
};

export { repoJobs, Repos, upsertRepo };
