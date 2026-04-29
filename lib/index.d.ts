import type { Package } from './data.js';
import type { PackageQueryFilter } from './query.js';
import type { Transaction, TransactionInit } from './transaction.js';

export * from './data.js';
export * from './query.js';
export * from './transaction.js';

export declare function loadRepos(): void;
export declare function query(...filters: PackageQueryFilter[]): Package[];
export declare function transaction(init: TransactionInit): Transaction;

declare const dnf5: {
	loadRepos: typeof loadRepos;
	query: typeof query;
	transaction: typeof transaction;
	Transaction: typeof Transaction;
};

export default dnf5;
