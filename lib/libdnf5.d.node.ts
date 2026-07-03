import type { Group, Package } from './data.ts';
import type { GroupQueryFilter, PackageQueryFilter } from './query.ts';
import type { TransactionInit } from './transaction.ts';
import type { Transaction } from './_classes.ts';
import type { LoadReposOptions } from './options.ts';

declare const dnf5: {
	Transaction: typeof Transaction;

	/**
	 * Load default repositories
	 */
	loadRepos(this: void, options?: LoadReposOptions): void;

	/**
	 * Query the loaded repositories using the given filters
	 */
	query(this: void, ...filters: PackageQueryFilter[]): Package[];

	/**
	 * Query the comps groups in the loaded repositories using the given filters
	 */
	queryGroups(this: void, ...filters: GroupQueryFilter[]): Group[];

	/**
	 * Create a new transaction
	 */
	transaction(this: void, init: TransactionInit): Transaction;
};

export default dnf5;
