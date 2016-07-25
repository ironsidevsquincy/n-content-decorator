const models = require('./models/index');

module.exports = (content, useCase) => {

	switch (useCase) {
		case 'article-card':
			return models.articleCard(content);
			break;
		case 'article-card-no-image':
			return models.articleCard(content, {removeImage: true});
			break;
		case 'stream-list-card':
			return models.streamListCard(content);
			break;
		default:
			return content;
			break;
	};
};
