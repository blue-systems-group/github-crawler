import { JobCollection as jobCollection } from 'meteor/vsivsi:job-collection';

const repoJobs = jobCollection('repos');

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

export { repoJobs };
