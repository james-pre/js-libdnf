#include "transaction.hxx"

#include "common.hxx"
#include "callbacks.hxx"
#include "goal.hxx"
#include "js-data.hxx"

FunctionReference Transaction::constructor;

static Object getOptionsObject(const CallbackInfo &info)
{
	Env env = info.Env();

	if (info.Length() == 0 || info[0].IsUndefined() || info[0].IsNull())
		return Object::New(env);

	if (!info[0].IsObject())
		throw TypeError::New(env, "Expected an options object");

	return info[0].As<Object>();
}

void Transaction::Init(const Napi::Env &env, Object &exports)
{
	Function func = DefineClass(env, "Transaction", {
														InstanceAccessor("packages", &Transaction::getPackages, nullptr),
														InstanceAccessor("packagesCount", &Transaction::getPackagesCount, nullptr),
														InstanceAccessor("groups", &Transaction::getGroups, nullptr),
														InstanceAccessor("brokenDependencyPackages", &Transaction::getBrokenDependencyPackages, nullptr),
														InstanceAccessor("conflictingPackages", &Transaction::getConflictingPackages, nullptr),
														InstanceAccessor("isEmpty", &Transaction::getIsEmpty, nullptr),

														InstanceMethod("download", &Transaction::download),
														InstanceMethod("run", &Transaction::run),
														InstanceMethod("setDescription", &Transaction::setDescription),
													});

	constructor = Persistent(func);
	constructor.SuppressDestruct();

	exports.Set("Transaction", func);
}

Transaction::Transaction(const CallbackInfo &args)
	: ObjectWrap<Transaction>(args)
{

	libdnf5::Goal goal(base);
	createGoal(goal, args[0].As<Object>());

	transaction = std::make_unique<libdnf5::base::Transaction>(goal.resolve());
}

Value Transaction::getPackages(const CallbackInfo &info)
{
	Napi::Env env = info.Env();
	return fromVector(env, transaction->get_transaction_packages(), fromTxPackage);
}

Value Transaction::getPackagesCount(const CallbackInfo &info)
{
	Napi::Env env = info.Env();
	return Number::New(env, transaction->get_transaction_packages_count());
}

Value Transaction::getGroups(const CallbackInfo &info)
{
	Napi::Env env = info.Env();
	return fromVector(env, transaction->get_transaction_groups(), fromTxGroup);
}

Value Transaction::getBrokenDependencyPackages(const CallbackInfo &info)
{
	Napi::Env env = info.Env();
	return fromVector(env, transaction->get_broken_dependency_packages(), fromPackage);
}

Value Transaction::getConflictingPackages(const CallbackInfo &info)
{
	Napi::Env env = info.Env();
	return fromVector(env, transaction->get_conflicting_packages(), fromPackage);
}

Value Transaction::getIsEmpty(const CallbackInfo &info)
{
	Napi::Env env = info.Env();
	return Boolean::New(env, transaction->empty());
}

Value Transaction::download(const CallbackInfo &info)
{
	Napi::Env env = info.Env();
	Object options = getOptionsObject(info);

	base.set_download_callbacks(std::make_unique<PackageDownloadCallbacks>(env, options));
	transaction->download();

	return env.Undefined();
}

Value Transaction::run(const CallbackInfo &info)
{
	Napi::Env env = info.Env();
	Object options = getOptionsObject(info);

	transaction->set_callbacks(std::make_unique<PackageTransactionCallbacks>(env, options));
	transaction->run();

	return env.Undefined();
}

Value Transaction::setDescription(const CallbackInfo &info)
{
	Napi::Env env = info.Env();

	if (info.Length() < 1 || !info[0].IsString())
		throw TypeError::New(env, "Expected a string");

	transaction->set_description(info[0].As<String>().Utf8Value());

	return env.Undefined();
}
