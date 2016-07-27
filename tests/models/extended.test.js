const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const brandingStub = sinon.stub();
const primaryImageStub = sinon.stub();
const imageFormatStub = sinon.stub();
const tagTransformStub = sinon.stub();

const subject = proxyquire('../../models/extended', {
	'ft-n-article-branding': brandingStub,
	'../lib/primary-image-transform': primaryImageStub,
	'../lib/image-format-transform': imageFormatStub,
	'../lib/tag-transform': tagTransformStub
});
const content = require('../fixtures/basic-article.json');

describe('Extended model transform', () => {

	brandingStub.returns({});
	primaryImageStub.returnsArg(0);
	imageFormatStub.returnsArg(0);
	tagTransformStub.returnsArg(0);

	it('returns the expected properties', () => {
		const result = subject(content);
		expect(result).to.have.all.keys([
			'summary',
			'subheading',
			'isEditorsChoice',
			'branding',
			'primaryImage',
			'imageFormat',
			'imageRatio'
		]);
	});

});
