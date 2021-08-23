import { generate } from '../';
import site from './data/site.json';
import changelogs from './data/changelogs.json';

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
