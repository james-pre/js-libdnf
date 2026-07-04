import type { Package, Group } from './data.js';
import type { LoadReposOptions } from './options.js';
import type { PackageQueryFilter, GroupQueryFilter } from './query.js';

/**
 * Load default repositories
 */
export declare function loadRepos(options?: LoadReposOptions): void;

/**
 * Query the loaded repositories using the given filters
 */
export declare function query(...filters: PackageQueryFilter[]): Package[];

/**
 * Query the comps groups in the loaded repositories using the given filters
 */
export declare function queryGroups(...filters: GroupQueryFilter[]): Group[];

export * from './data.js';
export * from './options.js';
export * from './query.js';
export * from './transaction.js';
