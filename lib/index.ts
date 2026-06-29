import dnf5 from './libdnf5.node';
import type * as classes from './_classes.js';

/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Group, Package } from './data.js';
import type { GroupQueryFilter, PackageQueryFilter } from './query.js';
import type { TransactionInit } from './transaction.js';
/* eslint-enable @typescript-eslint/no-unused-vars */

export const { Transaction, loadRepos, query, queryGroups, transaction } = dnf5;
export type Transaction = classes.Transaction;

export * from './data.js';
export * from './query.js';
export * from './transaction.js';
