/*global describe, it, context*/
'use strict';

const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const basicStub = sinon.stub();
const extendedStub = sinon.stub();
const opinionDataStub = sinon.stub();

const subject = proxyquire('../../models/index', {
	'./basic': basicStub,
	'./extended': extendedStub,
	'./opinion-data': opinionDataStub
});

basicStub.returns({basic: true});
extendedStub.returns({extended: true});
opinionDataStub.returns({opinionData: true});

describe('Models Index', () => {

	context('returns an object with the correct transforms', () => {

		it('Article Card transforms', () => {
			const result = subject.articleCard({});
			expect(result.basic).to.be.true;
			expect(result.extended).to.be.true;
			expect(result.opinionData).to.be.true;
		});

	});

});
