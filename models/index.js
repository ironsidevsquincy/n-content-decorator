'use strict';

const basic = require('./basic');
const extended = require('./extended');
const opinionData = require('./opinion-data');

module.exports = {

	articleCard: content => {
		return Object.assign({},
			basic(content),
			extended(content),
			opinionData(content)
		);
	}

};
