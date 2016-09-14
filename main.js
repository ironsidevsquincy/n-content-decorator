const applyModels = require('./models/index');

module.exports = (content, options) => {

	const optionsDefaults = {
		mutateOriginal: false,
		useCase: 'article-card',
		excludeTaxonomies: false
	};

	options = Object.assign(optionsDefaults, options);

	const decoration = applyModels(content, options);

	if (options.mutateOriginal) {
		Object.assign(content, decoration);
		return;
	} else {
		return decoration;
	}

};
