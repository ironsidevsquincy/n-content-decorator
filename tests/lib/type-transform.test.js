const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const isCommentTagStub = sinon.stub();

const subject = proxyquire('../../lib/type-transform', {
	'./utils/is-comment-tag': isCommentTagStub
});
const fixture = require('../fixtures/basic-article.json');

describe('Type Transform', () => {

	beforeEach(() => {
		isCommentTagStub.reset();
	});

	it('returns \'live-blog\' for a LiveBlog', () => {
		const content = {type: 'LiveBlog'};
		expect(subject(content)).to.equal('live-blog');
	});

	it('returns \'fast-ft\' for FastFT', () => {
		const content = {type: 'FastFt'};
		expect(subject(content)).to.equal('fast-ft');
	});

	context('with commemt tags / metadata', () => {

		beforeEach(() => {
			isCommentTagStub.returns(true);
		});

		it('returns \'opinion\' for genre of Comment (ES sourced data)', () => {
			const content = { metadata: [ { property: 'value' } ] };
			expect(subject(content)).to.equal('opinion');
		});

		it('returns \'opinion\' for genre of Comment (graphQL Api sourced data)', () => {
			const content = { tags: [ { property: 'value' } ] };
			expect(subject(content)).to.equal('opinion');
		});

	});


	it('returns \'editors-pick\' for Editors Choice (ES sourced data)', () => {
		const content = { standout: {editorsChoice: true} };
		expect(subject(content, {})).to.equal('editors-pick');
	});

	it('returns \'editors-pick\' for Editors Choice (graphQL Api sourced data)', () => {
		const content = { isEditorsChoice: true };
		expect(subject(content, {})).to.equal('editors-pick');
	});

	it('does not return \'editors-pick\' for Editors choice when minorBranding option is true', () => {
		const content = { standout: {editorsChoice: true} };
		expect(subject(content, { minorBranding: true })).to.equal('article');

	});

	it('returns \'article\' for everything else', () => {
		expect(subject(fixture)).to.equal('article');
	});

	context('prioritising the attributes', () => {

		beforeEach(() => {
			isCommentTagStub.returns(true);
		});

		it('prioritises LiveBlog 1st', () => {
			const content = {
				type: 'LiveBlog',
				tags: [ { property: 'value' } ],
				standout: {editorsChoice: true}
			};
			expect(subject(content, {})).to.equal('live-blog');
		});

		it('prioritises editors pick 2nd', () => {
			const content = {
				type: 'FastFt',
				tags: [ { property: 'value' } ],
				standout: {editorsChoice: true}
			};
			expect(subject(content, {})).to.equal('editors-pick');
		});

		it('prioritises FastFt 3rd', () => {
			const content = {
				type: 'FastFt',
				tags: [ { property: 'value' } ],
			};
			expect(subject(content, {})).to.equal('fast-ft');
		});

		it('prioritises opinion 4th', () => {
			const content = {
				tags: [ { property: 'value' } ]
			};
			expect(subject(content, {})).to.equal('opinion');
		});

	});

});
