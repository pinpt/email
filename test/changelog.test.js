const { generate } = require('..');
const site = require('./data/site.json');
const site_no_logo = require('./data/site_no_logo.json');
const changelogs = require('./data/changelogs.json');

test('exported', () => {
	expect(generate).toBeDefined();
});

test('invalid template', () => {
	expect(() => generate('foo', 'bar')).toThrow('invalid name of template. must be one of: changelog');
});

test('simple email with no data', () => {
	const data = {};
	expect(generate('changelog', data)).toMatchSnapshot();
});

test('simple email with data', () => {
	const data = {
		site,
		changelogs,
		changelog: changelogs[0],
	};
	expect(generate('changelog', data)).toMatchSnapshot();
});

test('alias blog', () => {
	const data = {
		site,
		changelogs,
		changelog: changelogs[0],
	};
	expect(generate('blog', data)).toMatchSnapshot();
});

test('site with no logo', () => {
	const data = {
		site: site_no_logo,
		changelogs,
		changelog: changelogs[0],
	};
	expect(generate('changelog', data)).toMatchSnapshot();
});
