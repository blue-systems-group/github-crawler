import { initDDP } from './lib';
import { join } from 'path';

const basePath = join(__dirname, 'repos');

initDDP('localhost', 3000, basePath);
