const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const getBrandingStub = sinon.stub();
const isCommentTagStub = sinon.stub();
const primaryTagTransformStub = sinon.stub();

const subject = proxyquire('../../lib/branding-transform', {
	'ft-n-article-branding': getBrandingStub,
	'./tag-transform': (tag) => tag,
	'./utils/is-comment-tag': isCommentTagStub,
	'./primary-tag-transform': primaryTagTransformStub
});

describe('Branding Transform', () => {

	afterEach(() => {
		getBrandingStub.reset();
		isCommentTagStub.reset();
		primaryTagTransformStub.reset();
	});

	context('already has branding property', () => {

		beforeEach(() => {
			isCommentTagStub.returns(true);
		});

		it('returns the existing branding value', () => {
			const content = { branding: { brandingValue: true, id: 'id' }, metadata: [ {property: 'value'} ] };
			const result = subject(content);
			expect(getBrandingStub.called).to.be.false;
			expect(result[0].brandingValue).to.be.true;
			expect(primaryTagTransformStub.called).to.be.false;
		});

		it('if branding is an author it takes the headshot from authors', () => {
			const branding = { taxonomy: 'authors', id: 'id' };
			const authors = [ { headshot: true } ];
			const metadata = [ {property: 'value'} ];
			const content = { branding, authors, metadata };
			expect(subject(content)[0].headshot).to.be.true;
			expect(primaryTagTransformStub.called).to.be.false;
		});

		it('does not fail if branding is authors and there are no author tags', () => {
			const branding = { taxonomy: 'authors', id: 'id' };
			const authors = undefined;
			const metadata = [ {property: 'value'} ];
			const content = { branding, authors, metadata };
			expect(subject(content)[0].headshot).to.be.undefined;
			expect(primaryTagTransformStub.called).to.be.false;
		});

	});

	context('has branding data and is comment, not Editors Choice', () => {

		beforeEach(() => {
			getBrandingStub.returns({ brandingValue: true, id: 'id' });
			isCommentTagStub.returns(true);
		});

		it('returns equal branding and brand values', () => {
			const content = { metadata: [ {property: 'value'} ]};
			const result = subject(content);
			expect(result[0]).to.deep.equal(result[1]);
			expect(result[0].brandingValue).to.be.true;
		});

	});

	context('no branding, but is Editors Choice', () => {

		beforeEach(() => {
			getBrandingStub.returns(undefined);
			primaryTagTransformStub.returns({ id: 'primaryTagId'});
		});

		context('isEditors Choice NOT already set', () => {

			it('returns branding undefined and brand as Editors Pick', () => {
				const content = { standout: { editorsChoice: true } };
				const result = subject(content);
				expect(result[0]).to.be.undefined;
				expect(result[1].title).to.equal('Editor’s Pick');
				expect(result[1].type).to.equal('editors-pick');
				expect(primaryTagTransformStub.calledOnce).to.be.true;
				expect(result[1].id).to.equal('primaryTagId');
			});

		});

		context('isEditors Choice IS already set', () => {

			it('returns branding undefined and brand as Editors Pick', () => {
				const content = { isEditorsChoice: true };
				const result = subject(content);
				expect(result[0]).to.be.undefined;
				expect(result[1].title).to.equal('Editor’s Pick');
				expect(result[1].type).to.equal('editors-pick');
				expect(primaryTagTransformStub.calledOnce).to.be.true;
				expect(result[1].id).to.equal('primaryTagId');
			});

		});

	});

	context('no branding, but has Authors', () => {

		beforeEach(() => {
			getBrandingStub.returns(undefined);
			isCommentTagStub.returns(true);
		});

		context('article is NOT editors choice', () => {

			it('returns the Author as the brand', () => {
				const firstAuthor = { name: 'First Author', idV1: 'firstAuthorId' };
				const secondAuthor = { name: 'Second Author' };
				const metadata = [ {property: 'value'} ]
				const content = { authors: [firstAuthor, secondAuthor], metadata };
				const result = subject(content);
				expect(result[0]).to.be.undefined;
				expect(result[1].title).to.equal('First Author');
				expect(primaryTagTransformStub.called).to.be.false;
			});

		});

	});

	context('no branding, not Editors Choice, but is Comment Genre', () => {

		beforeEach(() => {
			getBrandingStub.returns(undefined);
			isCommentTagStub.returns(true);
			primaryTagTransformStub.returns({ id: 'primaryTagId'});
		});

		context('content has metadata', () => {

			it('returns branding undefined and brand as Opinion', () => {
				const content = { metadata: [ {property: 'value'} ] };
				const result = subject(content);
				expect(result[0]).to.be.undefined;
				expect(result[1].title).to.equal('Opinion');
				expect(result[1].type).to.equal('opinion');
				expect(primaryTagTransformStub.calledOnce).to.be.true;
				expect(result[1].id).to.equal('primaryTagId');
			});

		});

		context('content has tags not metadata', () => {

			it('returns branding undefined and brand as Opinion', () => {
				const content = { tags: [ {property: 'value'} ] };
				const result = subject(content);
				expect(result[0]).to.be.undefined;
				expect(result[1].title).to.equal('Opinion');
				expect(result[1].type).to.equal('opinion');
				expect(primaryTagTransformStub.calledOnce).to.be.true;
				expect(result[1].id).to.equal('primaryTagId');
			});

		});

	});

});
