/* eslint-disable no-console */
import fs from 'fs';
import { join } from 'path';

const getDirSize = path => new Promise((resolve, reject) => {
  let totalSize = 0;
  let dirs = [path];
  try {
    while (dirs.length > 0) {
      const tmpDirs = [];
      for (const dir of dirs) {
        const stats = fs.statSync(dir);
        if (stats.isDirectory()) {
          const files = fs.readdirSync(dir);
          files.map(file => tmpDirs.push(join(dir, file)));
        } else {
          totalSize += stats.blksize;
        }
      }
      dirs = tmpDirs;
    }
    resolve(totalSize);
  } catch (e) {
    console.err('error in getDirSize:', e);
    reject(e);
  }
});

export { getDirSize };
