module.exports = mainImage => {
	if (!mainImage) return;

	return mainImage.width / mainImage.height;
};
