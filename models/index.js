const basic = require('./basic');
const extended = require('./extended');
const tagAndBranding = require('./tag-and-branding');

module.exports = (content, options) => {

	return Object.assign({},
		basic(content),
		extended(content, options),
		tagAndBranding(content, options)
	);

};
