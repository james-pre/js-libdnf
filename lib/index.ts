// @todo Switch to ESM addon import once `--experimental-addon-modules` is unflagged (see https://github.com/orgs/nodejs/discussions/5127)
// import dnf5 from './libdnf5.node';
import { createRequire } from 'node:module';
import type dnf5Type from './libdnf5.node';

const _require = createRequire(import.meta.url);
const dnf5: typeof dnf5Type = _require('./libdnf5.node');

/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Group, Package } from './data.js';
import type { GroupQueryFilter, PackageQueryFilter } from './query.js';
import type { TransactionInit } from './transaction.js';
/* eslint-enable @typescript-eslint/no-unused-vars */

import type * as classes from './_classes.js';

export const { Transaction, loadRepos, query, queryGroups, transaction } = dnf5;
export type Transaction = classes.Transaction;

export * from './data.js';
export * from './query.js';
export * from './transaction.js';
