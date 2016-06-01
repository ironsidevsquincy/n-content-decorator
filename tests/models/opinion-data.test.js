/*global describe, it, context*/
'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const tagTransformStub = sinon.stub();
const authorsTransformStub = sinon.stub();

const subject = proxyquire('../../models/opinion-data', {
	'../lib/tag-transform': tagTransformStub,
	'../lib/authors-transform': authorsTransformStub
});
const fixture = require('../fixtures/basic-article.json');

tagTransformStub.returnsArg(0);
authorsTransformStub.returns([]);

describe('Opinion Data transform', () => {

	const result = subject(fixture);

	it('returns an object with the correct properties', () => {
		expect(Object.keys(result).length).to.equal(2);
		expect(result).to.have.all.keys(['authors', 'tags']);
	});

	it('filters the tags appropriately', () => {
		expect(result.tags.length).to.equal(2);
		result.tags.map(tag => {
			expect(tag.taxonomy).to.be.oneOf(['genre', 'brand']);
		});
	});

});
