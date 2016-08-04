const isCommentTag = require('./utils/is-comment-tag');

module.exports = (content, options) => {

	const metadata = content.metadata || content.tags;
	// type property is only set on data sourced from graphQL API
	if (content.type === 'LiveBlog') {
		return 'live-blog';
	} else if (options && options.useCase === 'article-card'
			&& (content.isEditorsChoice || (content.standout && content.standout.editorsChoice))) {
			return 'editors-pick';
	} else if (content.type === 'FastFt') {
		return 'fast-ft';
	} else if (metadata && metadata.some(isCommentTag)) {
		return 'opinion';
	// data sourced from graphQL API has isEditorsChoice already summarised
	} else {
		return 'article';
	}
};
