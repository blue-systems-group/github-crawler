/* eslint-disable no-console */
import { getDirSize } from './du';
import rimraf from 'rimraf';

// 32 MB is large repo
const LARGE_REPO_SIZE = 32 * 1024 * 1024;

const cleanRepo = path => {
  console.log('clean repo:', path);
  rimraf(path, (err, res) => {
    console.log('clean res:', err, res);
  });
};

const isSmallRepo = path => new Promise((resolve, reject) => {
  getDirSize(path)
  .then(size => {
    if (size > LARGE_REPO_SIZE) {
      reject(new Error('repo size too large!'));
    } else {
      resolve(size);
    }
  }).catch(err => reject(err));
});

export { isSmallRepo, cleanRepo };
