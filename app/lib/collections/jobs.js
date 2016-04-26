import { JobCollection as jobCollection } from 'meteor/vsivsi:job-collection';

const repoJobs = jobCollection('repos');

repoJobs.startJobServer();

export { repoJobs };
