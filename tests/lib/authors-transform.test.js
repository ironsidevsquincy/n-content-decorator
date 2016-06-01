/*global describe, it, context*/
'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const tagTransformStub = sinon.stub();
const brandingStub = sinon.stub();

const subject = proxyquire('../../lib/authors-transform', {
	'./tag-transform': tagTransformStub,
	'ft-n-article-branding': brandingStub
});
const fixture = require('../fixtures/basic-article.json');

tagTransformStub.returnsArg(0);
brandingStub.returns({
	headshot: 'www.someweb.address.com'
});

describe('Author Transform', () => {

	const authorTags = fixture.metadata.filter(data => data.taxonomy === 'authors');
	const authorsNumber = authorTags.length;
	const result = subject(authorTags);

	context('Multiple authors', () => {

		it('returns an array as a response', () => {
			expect(result.length).to.equal(authorsNumber);
		});

	});

	context('On each author tag', () => {

		it('returns an object with the right properties', () => {
			result.forEach(res => {
				expect(res).to.contain.all.keys(['headshot', 'isBrand']);
			});
		});

	});
});
