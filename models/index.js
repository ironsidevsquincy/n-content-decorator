'use strict';

const basic = require('./basic');
const extended = require('./extended');
const opinionData = require('./opinion-data');
const primaryTags = require('./primary-tags');

module.exports = {

	articleCard: content => {
		return Object.assign({},
			basic(content),
			extended(content),
			primaryTags(content),
			opinionData(content)
		);
	},

	streamListCard: content => {
		return Object.assign({},
			basic(content),
			extended(content),
			primaryTags(content, 'summary')
		);
	}

};
