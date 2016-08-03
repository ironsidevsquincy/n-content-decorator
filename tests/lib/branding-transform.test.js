const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const getBrandingStub = sinon.stub();

const subject = proxyquire('../../lib/branding-transform', {
	'ft-n-article-branding': getBrandingStub,
	'./tag-transform': (tag) => tag
});

describe('Branding Transform', () => {

	beforeEach(() => {
		getBrandingStub.reset();
	});

	context('already has branding property', () => {

		it('returns the existing branding value', () => {
			const content = { branding: { brandingValue: true }, metadata: [{ taxonomy: 'genre', idV1: 'OA==-R2VucmVz' }]};
			const result = subject(content);
			expect(getBrandingStub.called).to.be.false;
			expect(result[0].brandingValue).to.be.true;
		});

	});

	context('has branding data and is comment, not Editors Choice', () => {

		beforeEach(() => {
			getBrandingStub.returns({ brandingValue: true });
		});

		it('returns equal branding and brand values', () => {
			const content = { metadata: [{ taxonomy: 'genre', idV1: 'OA==-R2VucmVz' }]};
			const result = subject(content);
			expect(result[0]).to.deep.equal(result[1]);
			expect(result[0].brandingValue).to.be.true;
		});

	});

	context('no branding, but is Editors Choice', () => {

		beforeEach(() => {
			getBrandingStub.returns(undefined);
		});

		context('isEditors Choice NOT already set', () => {

			it('returns branding undefined and brand as Editors Pick', () => {
				const content = { standout: { editorsChoice: true } };
				const result = subject(content);
				expect(result[0]).to.be.undefined;
				expect(result[1].title).to.equal('Editor’s Pick');
				expect(result[1].type).to.equal('editors-pick');
			});

		});

		context('isEditors Choice IS already set', () => {

			it('returns branding undefined and brand as Editors Pick', () => {
				const content = { isEditorsChoice: true };
				const result = subject(content);
				expect(result[0]).to.be.undefined;
				expect(result[1].title).to.equal('Editor’s Pick');
				expect(result[1].type).to.equal('editors-pick');
			});

		});

	});

	context('no branding, but has Authors', () => {

		beforeEach(() => {
			getBrandingStub.returns(undefined);
		});

		context('article is NOT editors choice', () => {

			it('returns the Author as the brand', () => {
				const firstAuthor = { name: 'First Author' };
				const secondAuthor = { name: 'Second Author' };
				const metadata = [{ taxonomy: 'genre', idV1: 'OA==-R2VucmVz' }]
				const content = { authors: [firstAuthor, secondAuthor], metadata };
				const result = subject(content);
				expect(result[0]).to.be.undefined;
				expect(result[1].title).to.equal('First Author');
			});

		});

		context('isEditors Choice is NOT already set', () => {

			it('returns Editor\'s pick as the brand', () => {

			});

		});

	});

	context('no branding, not Editors Choice, but is Comment Genre', () => {

		beforeEach(() => {
			getBrandingStub.returns(undefined);
		});

		context('content has metadata', () => {

			it('returns branding undefined and brand as Opinion', () => {
				const content = { metadata: [{ taxonomy: 'genre', idV1: 'OA==-R2VucmVz' }]};
				const result = subject(content);
				expect(result[0]).to.be.undefined;
				expect(result[1].title).to.equal('Opinion');
				expect(result[1].type).to.equal('opinion');
			});

		});

		context('content has tags not metadata', () => {

			it('returns branding undefined and brand as Opinion', () => {
				const content = { tags: [{ taxonomy: 'genre', name: 'Comment' }]};
				const result = subject(content);
				expect(result[0]).to.be.undefined;
				expect(result[1].title).to.equal('Opinion');
				expect(result[1].type).to.equal('opinion');
			});

		});

	});

});
