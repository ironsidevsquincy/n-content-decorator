const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const basicStub = sinon.stub();
const extendedStub = sinon.stub();
const tagAndBrandingStub = sinon.stub();

const subject = proxyquire('../../models/index', {
	'./basic': basicStub,
	'./extended': extendedStub,
	'./tag-and-branding': tagAndBrandingStub
});

describe('Calling models', () => {

	beforeEach(() => {
		basicStub.reset();
		extendedStub.reset();
		tagAndBrandingStub.reset();
	});

	context('general', () => {

		it('calls all three models', () => {
			subject();
			expect(basicStub.calledOnce).to.be.true;
			expect(extendedStub.calledOnce).to.be.true;
			expect(tagAndBrandingStub.calledOnce).to.be.true;
		});

	});

	context('with specific use cases', () => {

		it('passes the use case option to the tag and branding model', () => {
			subject({}, {useCase: 'useCase'});
			expect(tagAndBrandingStub.calledWith({},{useCase: 'useCase'})).to.be.true;
		});
	});

});
