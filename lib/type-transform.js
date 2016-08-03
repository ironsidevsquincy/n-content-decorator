const isCommentTag = require('./utils/is-comment-tag');

module.exports = content => {
	// type property is only set on data sourced from graphQL API
	if (content.type === 'LiveBlog') {
		return 'live-blog';
	} else if (content.type === 'FastFt') {
		return 'fast-ft';
	} else if (content.metadata && content.metadata.some(isCommentTag)) {
		return 'opinion';
	// data sourced from graphQL API only has tags not metadata
	} else if (content.tags && content.tags.some(isCommentTag)) {
		return 'opinion';
	// data sourced from graphQL API has isEditorsChoice already summarised
	} else if (content.isEditorsChoice || (content.standout && content.standout.editorsChoice)) {
		return 'editors-pick';
	} else {
		return 'article';
	}
};
