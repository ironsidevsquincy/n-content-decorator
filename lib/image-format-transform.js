module.exports = mainImage => {
	if (!mainImage) return;

	const width = mainImage.width;
	const height = mainImage.height;

	if (width === height) return 'square';
	return width > height ? 'landscape' : 'portrait';
};
