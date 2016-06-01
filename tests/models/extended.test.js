/*global describe, it*/
'use strict';

const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const brandingStub = sinon.stub();
const primaryImageStub = sinon.stub();
const primaryTagsTransformStub = sinon.stub();
const tagTransformStub = sinon.stub();

const subject = proxyquire('../../models/extended', {
	'ft-n-article-branding': brandingStub,
	'../lib/primary-image-transform': primaryImageStub,
	'../lib/primary-tags-transform': primaryTagsTransformStub,
	'../lib/tag-transform': tagTransformStub
});
const content = require('../fixtures/basic-article.json');

describe('Extended model transform', () => {

	brandingStub.returns({});
	primaryImageStub.returnsArg(0);
	primaryTagsTransformStub.returns(
		{
			primaryTheme: {},
			primarySection: {},
			primaryBrand: {},
			primaryTag: {}
		}
	);
	tagTransformStub.returnsArg(0);

	it('returns the expected properties', () => {
		const result = subject(content);
		expect(Object.keys(result).length).to.equal(8);
		expect(result).to.have.all.keys([
			'summary',
			'isEditorsChoice',
			'branding',
			'primaryImage',
			'primaryTheme',
			'primarySection',
			'primaryBrand',
			'primaryTag'
		]);
	});

});
