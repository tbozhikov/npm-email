import test from 'ava';
import m from './';

const semver = require('semver');

function isWHATWGURLSupported() {
	// WHATWG URLS are supported since v7.0.0
	return semver.gte(process.version, '7.0.0');
}

test('invalid input', async t => {
	await t.throws(m(1), 'username required');
});

test('unknown username', async t => {
	const randomName = `asdasfgrgafadsgaf${Math.random().toString().slice(2)}`;
	await t.throws(m(randomName), `User ${randomName} doesn't exist`);
});

test('valid username', async t => {
	t.is(await m('sindresorhus'), 'sindresorhus@gmail.com');
});

if (isWHATWGURLSupported()) {
	test('valid username with special char', async t => {
		t.is(await m(`lukeramsden'`), 'lukeramsden8@gmail.com');
	});
}
