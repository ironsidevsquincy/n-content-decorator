const branding = require('ft-n-article-branding');
const tagTransform = require('./tag-transform');

const getAuthorDetail = (authorMetadata) => {
	const metadata = [
		authorMetadata,
		{
			taxonomy: 'genre',
			prefLabel: 'Comment'
		}
	];
	return {
		headshot: branding(metadata).headshot,
		isBrand: authorMetadata.primary === 'brand'
	};
};

module.exports = (authorTags) => {

	return authorTags.map(authorTag => {
		return Object.assign(
			tagTransform(authorTag),
			getAuthorDetail(authorTag)
		);
	});

};
