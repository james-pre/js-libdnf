import type { Package } from './data.ts';
import type { PackageQueryFilter } from './query.ts';
import type { TransactionInit } from './transaction.ts';
import type { Transaction } from './_classes.ts';

declare const dnf5: {
	Transaction: typeof Transaction;

	/**
	 * Load default repositories
	 */
	loadRepos(this: void): void;

	/**
	 * Query the loaded repositories using the given filters
	 */
	query(this: void, ...filters: PackageQueryFilter[]): Package[];

	/**
	 * Create a new transaction
	 */
	transaction(this: void, init: TransactionInit): Transaction;
};

export default dnf5;
