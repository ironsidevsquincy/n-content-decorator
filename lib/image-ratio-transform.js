module.exports = mainImage => {
	if (!mainImage || !mainImage.width || !mainImage.height) return;

	return mainImage.width / mainImage.height;
};
