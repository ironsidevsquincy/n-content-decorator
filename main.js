const basic = require('./models/basic');
const extended = require('./models/extended');
const tagAndBranding = require('./models/tag-and-branding');

module.exports = (content, options) => {

		return Object.assign({},
			basic(content),
			extended(content),
			tagAndBranding(content, options)
		);

};
