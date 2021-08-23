import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import { fileURLToPath } from 'url';
import './helpers';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const validTemplates = ['changelog'];
const aliases = {
	blog: 'changelog',
};

const generate = (templateName, data) => {
	const name = aliases[templateName] || templateName;
	if (!validTemplates.includes(name)) {
		throw new Error('invalid name of template. must be one of: ' + validTemplates.join(', '));
	}
	const fn = path.join(__dirname, 'src', name, 'email.html');
	if (!fs.existsSync(fn)) {
		throw new Error(`couldn't find template at ${fn}`);
	}
	const template = fs.readFileSync(fn).toString();
	const tmpl = Handlebars.compile(template);
	const _data = { ...data };
	_data.__filename = fn;
	_data.__dirname = path.dirname(fn);
	_data.manageSubscriptionLink = '__MANAGE_SUBSCRIPTION_LINK__';
	_data.unsubscribeLink = '__UNSUBSCRIBE_LINK__';
	_data.poweredByImage = 'https://cdn.pinpoint.com/images/email/powered_by_30.png';
	_data.poweredByLink = '__POWEREDBY_LINK__';
	return tmpl(_data);
};

export { generate };
