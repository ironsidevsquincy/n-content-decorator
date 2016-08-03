// Currently only data sourced from via graphQL API would have this
module.exports = content => {
	if (content.type === 'LiveBlog') {
		return {
			status: content.status,
			latestUpdate: (content.updates) ? content.updates[0] : undefined
		};
	}
};
