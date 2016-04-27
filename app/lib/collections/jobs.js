import { JobCollection as jobCollection } from 'meteor/vsivsi:job-collection';

const repoJobs = jobCollection('repos');

export { repoJobs };
