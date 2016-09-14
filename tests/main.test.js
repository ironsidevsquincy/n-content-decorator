const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const applyModelsStub = sinon.stub();

const subject = proxyquire('../main', {
	'./models/index': applyModelsStub
});

describe('Calling models', () => {

	beforeEach(() => {
		applyModelsStub.reset();
	});

	context('general', () => {

		it('calls the \'apply models\' method', () => {
			subject();
			expect(applyModelsStub.calledOnce).to.be.true;
		});

		it('applies the default options if not specified', () => {
			subject();
			expect(applyModelsStub.getCall(0).args[1]).to.have.all.keys([
				'mutateOriginal',
				'excludeTaxonomies',
				'minorBranding'
			]);
		});

		it('does not overwrite passed through options', () => {
			subject({}, {mutateOriginal: true});
			expect(applyModelsStub.getCall(0).args[1].mutateOriginal).to.be.true;
		});

	});

	context('with option to mutate original object', () => {

		it('adds new properties into the original object', () => {
			const content = { original: true };
			applyModelsStub.returns({ decoration: true });
			subject(content, { mutateOriginal: true });
			expect(content.decoration).to.exist;
		});

	});

	context('without option to mutate original object', () => {

		it('returns only the decoration', () => {
			const content = { original: true };
			applyModelsStub.returns({ decoration: true });
			const result = subject(content, { mutateOriginal: false });
			expect(result.decoration).to.exist;
			expect(result.original).to.not.exist;
		});

	});


});
