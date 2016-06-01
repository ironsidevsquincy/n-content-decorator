'use strict';

const models = require('./models/index');

module.exports = (content, useCase) => {

	switch (useCase) {
		case 'articleCard':
			return models.articleCard(content);
			break;
		default:
			return content;
			break;
	};
};
