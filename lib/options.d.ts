export interface LoadReposOptions {
	/**
	 * Acquire a write lock on the system repository (defaults to `true`).
	 * A write lock requires root; set to `false` for a shared read lock suitable for read-only queries.
	 */
	write?: boolean;
	/**
	 * Wait for the lock if it is held by another process (defaults to `true`).
	 * When `false`, locking fails immediately if the lock cannot be acquired.
	 */
	blocking?: boolean;
	downloadRequired?: boolean;
}
