import type { Group, Package } from './data.ts';
import type { GroupQueryFilter, PackageQueryFilter } from './query.ts';
import type { TransactionInit } from './transaction.ts';
import type { Transaction } from './_classes.ts';

declare const dnf5: {
	Transaction: typeof Transaction;

	/**
	 * Load default repositories
	 *
	 * @param options.write Acquire a write lock on the system repository (defaults to `true`).
	 * A write lock requires root; set to `false` for a shared read lock suitable for read-only queries.
	 * @param options.blocking Wait for the lock if it is held by another process (defaults to `true`).
	 * When `false`, locking fails immediately if the lock cannot be acquired.
	 */
	loadRepos(this: void, options?: { write?: boolean; blocking?: boolean }): void;

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
