'use strict';

const models = require('./models/index');

module.exports = (content, useCase) => {

	switch (useCase) {
		case 'articleCard':
			return models.articleCard(content);
			break;
		case 'streamListCard':
			return models.streamListCard(content);
			break;
		default:
			return content;
			break;
	};
};
