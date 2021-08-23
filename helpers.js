const path = require('path');
const fs = require('fs');
const Handlebars = require('handlebars');

Handlebars.registerHelper('gte', function (v1, v2, options) {
	if (v1 >= v2) {
		return options.fn(this);
	}
	return options.inverse(this);
});

Handlebars.registerHelper('lt', function (v1, v2, options) {
	if (v1 < v2) {
		return options.fn(this);
	}
	return options.inverse(this);
});

Handlebars.registerHelper('lte', function (v1, v2, options) {
	if (v1 <= v2) {
		return options.fn(this);
	}
	return options.inverse(this);
});

Handlebars.registerHelper('len', function (arg) {
	if (Array.isArray(arg)) {
		return arg.length;
	}
	return 0;
});

Handlebars.registerHelper('empty', function (arg) {
	if (Array.isArray(arg)) {
		return arg.length === 0;
	}
	return true;
});

Handlebars.registerHelper('last', function (arg) {
	if (Array.isArray(arg)) {
		return arg[arg.length - 1];
	}
	throw new Error('last must be called with an array');
});

Handlebars.registerHelper('after', function (arg, index, length) {
	if (Array.isArray(arg)) {
		return arg.slice(index, typeof length === 'number' ? index + length : undefined);
	}
	throw new Error('after must be called with an array');
});

Handlebars.registerHelper('pick', function (arg, index, offset = 0) {
	if (Array.isArray(arg)) {
		return arg.slice(offset)[index];
	}
	throw new Error('pick must be called with an array');
});

Handlebars.registerHelper('include', function (arg) {
	const baseDir = arg.data.root.__dirname;
	const fn = path.resolve(baseDir, arg.hash.src);
	const context = {
		...arg.data.root,
		...(arg.hash.context || {}),
	};
	const keys = Object.keys(arg.hash).filter((k) => k !== 'src' && k !== 'context');
	keys.forEach((key) => (context[key] = arg.hash[key]));
	const buf = fs.readFileSync(fn).toString();
	return new Handlebars.SafeString(Handlebars.compile(buf)(context));
});
