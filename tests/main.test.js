/*global describe, it, context*/
'use strict';

const expect = require('chai').expect;
const proxyquire = require('proxyquire');

const subject = proxyquire('../main', {
	'./models/index': {
		articleCard: () => 'articleCard'
	}
});

describe('Mapping use cases', () => {

	context('when there is a match', () => {

		it('Article Card use case', () => {
			const result = subject('content', 'articleCard');
			expect(result).to.equal('articleCard');
		});
	});

	context('when there is not a match', () => {

		it('returns the content', () => {
			const result = subject('content', 'noUseCase');
			expect(result).to.equal('content');
		});
	});

});
