// @ts-expect-error 2307
import dnf5 from './libdnf5.node';

export const { Transaction, loadRepos, query, transaction } = dnf5;
export default dnf5;
