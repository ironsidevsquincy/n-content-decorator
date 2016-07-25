const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const basicStub = sinon.stub();
const extendedStub = sinon.stub();
const primaryTagsStub = sinon.stub();
const opinionDataStub = sinon.stub();

const subject = proxyquire('../../models/index', {
	'./basic': basicStub,
	'./extended': extendedStub,
	'./opinion-data': opinionDataStub,
	'./primary-tags': primaryTagsStub
});

basicStub.returns({basic: true});
extendedStub.returns({extended: true});
opinionDataStub.returns({opinionData: true});
primaryTagsStub.returns({primaryTag: true});

describe('Models Index', () => {

	context('returns an object with the correct transforms', () => {

		it('Article Card transforms', () => {
			const result = subject.articleCard({});
			expect(result).to.have.all.keys([
				'basic',
				'extended',
				'opinionData',
				'primaryTag'
			]);
		});

		it('Stream List Card transforms', () => {
			const result = subject.streamListCard({});
			expect(result).to.have.all.keys([
				'basic',
				'extended',
				'primaryTag'
			]);
		});

	});

});
