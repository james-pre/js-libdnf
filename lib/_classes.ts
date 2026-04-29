import type { Package } from './data.js';
import type {
	TransactionPackage,
	TransactionGroup,
	TransactionDownloadOptions,
	TransactionRunOptions,
} from './transaction.js';

export declare class Transaction {
	private constructor();

	get packages(): TransactionPackage[];
	get packagesCount(): number;
	get groups(): TransactionGroup[];
	get brokenDependencyPackages(): Package[];
	get conflictingPackages(): Package[];
	get isEmpty(): boolean;

	/**
	 * Download the needed packages
	 */
	download(options?: TransactionDownloadOptions): void;

	/**
	 * Run the transaction
	 */
	run(options?: TransactionRunOptions): void;

	/**
	 * Set the description to be used in the transaction history
	 */
	setDescription(description: string): void;
}
