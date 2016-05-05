/* eslint-disable no-console */
import { getDirSize } from './du';
import { exec } from 'child_process';

// 32 MB is large repo
const LARGE_REPO_SIZE = 32 * 1024 * 1024;

const cleanRepo = path => {
  console.log('clean repo:', path);
  exec(`rm -rf ${path}`, (error, stdout, stderr) => {
    console.log(
      'clean res:',
      `${path}
      stdout: ${stdout}
      stderr: ${stderr}`);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
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
