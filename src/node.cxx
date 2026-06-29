#include <memory>
#include <libdnf5/base/goal.hpp>
#include <libdnf5/repo/package_downloader.hpp>
#include "common.hxx"
#include "query.hxx"
#include "goal.hxx"
#include "js-data.hxx"
#include "transaction.hxx"

Value PrepareTransaction(const CallbackInfo &args)
{

	libdnf5::Goal goal(base);
	createGoal(goal, args[0].As<Object>());

	auto transaction = std::make_unique<libdnf5::base::Transaction>(goal.resolve());

	return Transaction::NewInstance(args.Env(), std::move(transaction));
}

Value Query(const CallbackInfo &args)
{
	Env env = args.Env();

	libdnf5::rpm::PackageQuery query = createPackageQuery(args);

	Array results = Array::New(env);

	for (const libdnf5::rpm::Package &pkg : query)
		results.Set(results.Length(), fromPackage(env, pkg));

	return results;
}

Value QueryGroups(const CallbackInfo &args)
{
	Env env = args.Env();

	libdnf5::comps::GroupQuery query = createGroupQuery(args);

	Array results = Array::New(env);

	for (libdnf5::comps::Group group : query)
		results.Set(results.Length(), fromGroup(env, group));

	return results;
}

struct LoadReposOptions
{
	bool write;
	bool blocking;
};

static const auto LoadReposOptionsSchema = schema::object<LoadReposOptions>({
	schema::field<&LoadReposOptions::write>("write", schema::boolean().coerce().defaultTo(true)),
	schema::field<&LoadReposOptions::blocking>("blocking", schema::boolean().coerce().defaultTo(true)),
});

Value LoadRepos(const CallbackInfo &args)
{
	Env env = args.Env();

	// Parse options
	LoadReposOptions options = LoadReposOptionsSchema.parse(args.Length() > 0 ? args[0] : Object::New(env));

	// Load repos
	auto repo_sack = base.get_repo_sack();
	repo_sack->create_repos_from_system_configuration();

	base.lock_system_repo(
		options.write ? libdnf5::utils::LockAccess::WRITE : libdnf5::utils::LockAccess::READ,
		options.blocking ? libdnf5::utils::LockBlocking::BLOCKING : libdnf5::utils::LockBlocking::NON_BLOCKING);

	repo_sack->load_repos();

	return env.Undefined();
}

Object Init(Env env, Object exports)
{

	base.load_config();
	base.setup();

	Transaction::Init(env, exports);

	exports.Set("loadRepos", Function::New(env, LoadRepos));
	exports.Set("query", Function::New(env, Query));
	exports.Set("queryGroups", Function::New(env, QueryGroups));
	exports.Set("transaction", Function::New(env, PrepareTransaction));
	return exports;
}

NODE_API_MODULE(js_libdnf5, Init)
