const applyModels = require('./models/index');

module.exports = (content, options) => {

	const decoration = applyModels(content, options);

	if (options && options.mutateOriginal) {
		Object.assign(content, decoration);
		return;
	} else {
		return decoration;
	}

};
