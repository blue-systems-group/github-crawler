import { initDDP } from './lib';
import { join } from 'path';

const home = process.env.HOME;
const basePath = join(home, 'repos');

initDDP('localhost', 3000, basePath);
