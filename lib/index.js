// @todo Switch to ESM addon import once `--experimental-addon-modules` is unflagged (see https://github.com/orgs/nodejs/discussions/5127)
// import dnf5 from './libdnf5.node';
import { createRequire } from 'node:module';

const dnf5 = createRequire(import.meta.url)('./libdnf5.node');

export const { Transaction, loadRepos, query, queryGroups } = dnf5;
