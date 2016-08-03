module.exports = tag => {
	if (tag) {
		return tag.taxonomy === 'genre' &&
		(tag.idV1 === 'OA==-R2VucmVz' || tag.id === 'OA==-R2VucmVz' || tag.name === 'Comment');
	}
}
