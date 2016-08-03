module.exports = content => {

	if (content.summary) {
		return content.summary;
	}

	return content.summaries && content.summaries.length ? content.summaries[0] : null;

}
