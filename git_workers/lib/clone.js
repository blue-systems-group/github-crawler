import NodeGit from 'nodegit';
import { join } from 'path';


const clone = (repo, basePath) => {
  const { name, url } = repo;
  const localPath = join(basePath, name);

  const cloneOptions = {
    fetchOpts: {
      callbacks: {
        certificateCheck() {
          return 1;
        },
      },
    },
  };

  const cloneRepository = new NodeGit.Clone(url, localPath, cloneOptions);

  return cloneRepository;
};

export { clone };
