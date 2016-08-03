const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const brandingStub = sinon.stub();

const subject = proxyquire('../../models/tag-and-branding', {
	'../lib/primary-tag-transform': () => ({ tagValue: true }),
	'../lib/branding-transform': brandingStub
});

describe('Tag and Branding', () => {

	beforeEach(() => {
		brandingStub.reset();
	});

	context('article card use case', () => {

		const options = { useCase: 'article-card' };

		it('returns just brand, if brand exists', () => {
			brandingStub.returns([{brandingValue: true}, {brandValue: true}]);
			const result = subject({}, options);
			expect(result.brand.brandValue).to.be.true;
			expect(result.tag).to.not.exist;
		});

		it('returns tag if brand does not exist', () => {
			brandingStub.returns([undefined, undefined]);
			const result = subject({}, options);
			expect(result.brand).to.not.exist;
			expect(result.tag.tagValue).to.be.true;
		});

	});

	context('stream list card use case', () => {

		const options = { useCase: 'stream-list-card' };

		it('returns tag and branding', () => {
			brandingStub.returns([{brandingValue: true}, {brandValue: true}]);
			const result = subject({}, options);
			expect(result.branding.brandingValue).to.be.true;
			expect(result.tag.tagValue).to.be.true;
		});

	});

	context('neither article or stream list card use case', () => {

		const options = undefined;

		it('does not return any thing', () => {
			brandingStub.returns([{brandingValue: true}, {brandValue: true}]);
			const result = subject({}, options);
			expect(result).to.be.undefined;
		});

	});

});
