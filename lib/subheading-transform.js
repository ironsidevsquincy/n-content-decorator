const cheerio = require('cheerio');

module.exports = item => {
	// none of these properties are available in data sourced from graphQL
	if (item.summaries && item.summaries.length) {
		return item.summaries[0];
	} else if (item.openingHTML) {
		return cheerio.load(item.openingHTML)('p').first().text();
	} else if (item.bodyHTML) {
		return cheerio.load(item.bodyHTML)('p').first().text();
	}
};
