const expect = require('chai').expect;

const subject = require('../../lib/type-transform');
const fixture = require('../fixtures/basic-article.json');

describe('Type Transform', () => {

	it('returns \'live-blog\' for a LiveBlog', () => {
		const content = {type: 'LiveBlog'};
		expect(subject(content)).to.equal('live-blog');
	});

	it('returns \'fast-ft\' for FastFT', () => {
		const content = {type: 'FastFt'};
		expect(subject(content)).to.equal('fast-ft');
	});

	it('returns \'opinion\' for genre of Comment (ES sourced data)', () => {
		const content = { metadata: [ { taxonomy: 'genre', name: 'Comment', idV1: 'OA==-R2VucmVz'} ] };
		expect(subject(content)).to.equal('opinion');
	});

	it('returns \'opinion\' for genre of Comment (graphQL Api sourced data)', () => {
		const content = { tags: [ { taxonomy: 'genre', name: 'Comment', id: 'OA==-R2VucmVz'} ] };
		expect(subject(content)).to.equal('opinion');
	});

	it('returns \'editors-pick\' for Editors Choice (ES sourced data)', () => {
		const content = { standout: {editorsChoice: true} };
		expect(subject(content)).to.equal('editors-pick');
	});

	it('returns \'editors-pick\' for Editors Choice (graphQL Api sourced data)', () => {
		const content = { isEditorsChoice: true };
		expect(subject(content)).to.equal('editors-pick');
	});

	it('returns \'article\' for everything else', () => {
		expect(subject(fixture)).to.equal('article');
	});

	context('prioritising the attributes', () => {

		it('prioritises LiveBlog 1st', () => {
			const content = {
				type: 'LiveBlog',
				tags: [ { taxonomy: 'genre', name: 'Comment', id: 'OA==-R2VucmVz' } ],
				standout: {editorsChoice: true}
			};
			expect(subject(content)).to.equal('live-blog');
		});

		it('prioritises FastFt 2nd', () => {
			const content = {
				type: 'FastFt',
				tags: [ { taxonomy: 'genre', name: 'Comment', id: 'OA==-R2VucmVz' } ],
				standout: {editorsChoice: true}
			};
			expect(subject(content)).to.equal('fast-ft');
		});

		it('prioritises opinion 3rd', () => {
			const content = {
				tags: [ { taxonomy: 'genre', name: 'Comment', id: 'OA==-R2VucmVz' } ],
				standout: {editorsChoice: true}
			};
			expect(subject(content)).to.equal('opinion');
		});

		it('prioritises editors pick 4th', () => {
			const content = {
				standout: {editorsChoice: true}
			};
			expect(subject(content)).to.equal('editors-pick');
		});

	});

});
