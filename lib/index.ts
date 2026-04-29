import dnf5 from './libdnf5.node';
import type * as classes from './_classes.js';

export const { Transaction, loadRepos, query, transaction } = dnf5;
export type Transaction = classes.Transaction;

export * from './data.js';
export * from './query.js';
export * from './transaction.js';
