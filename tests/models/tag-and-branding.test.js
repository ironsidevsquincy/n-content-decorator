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

	context('without minor branding option (default)', () => {

		const options = { minorBranding: false };

		it('returns just brand, if brand exists', () => {
			brandingStub.returns([{brandingValue: true}, {brandValue: true}]);
			const result = subject({}, options);
			expect(result.brand.brandValue).to.be.true;
			expect(result.tag).to.not.exist;
			expect(result.branding).to.be.null;
		});

		it('returns tag if brand does not exist', () => {
			brandingStub.returns([undefined, undefined]);
			const result = subject({}, options);
			expect(result.brand).to.not.exist;
			expect(result.tag.tagValue).to.be.true;
			expect(result.branding).to.be.null;
		});

		it('returns undefined if content type is a live blog', () => {
			brandingStub.returns([{brandingValue: true}, {brandValue: true}]);
			const result = subject({ type: 'LiveBlog' }, options);
			expect(result).to.be.undefined;
		});

	});

	context('stream list card use case', () => {

		const options = { minorBranding: true };

		it('returns tag and branding', () => {
			brandingStub.returns([{brandingValue: true}, {brandValue: true}]);
			const result = subject({}, options);
			expect(result.branding.brandingValue).to.be.true;
			expect(result.tag.tagValue).to.be.true;
			expect(result.brand).to.be.null;
		});

	});

});
