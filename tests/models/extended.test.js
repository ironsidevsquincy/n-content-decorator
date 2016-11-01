const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const imageStub = sinon.stub();
const liveBlogStub = sinon.stub();
const relatedContentStub = sinon.stub();
const subHeadingStub = sinon.stub();
const summaryStub = sinon.stub();
const typeStub = sinon.stub();

const subject = proxyquire('../../models/extended', {
	'../lib/image-transform': imageStub,
	'../lib/live-blog-transform': liveBlogStub,
	'../lib/related-content-transform': relatedContentStub,
	'../lib/subheading-transform': subHeadingStub,
	'../lib/summary-transform': summaryStub,
	'../lib/type-transform': typeStub
});
const content = require('../fixtures/basic-article.json');

describe('Extended model transform', () => {

	imageStub.returnsArg(0);
	liveBlogStub.returnsArg(0);
	relatedContentStub.returnsArg(0);
	subHeadingStub.returnsArg(0);
	summaryStub.returnsArg(0);
	typeStub.returnsArg(0);

	it('returns the expected properties', () => {
		const result = subject(content);
		expect(result).to.have.all.keys([
			'hideTimestampState',
			'image',
			'liveBlog',
			'relatedContent',
			'summary',
			'type',
		]);
	});

	context('different image properties for image transform', () => {

		it('passes through a mainImage property if it exists', () => {
			const content = { mainImage: true };
			expect(subject(content).image).to.be.true;
		});

		it('passes through a primaryImage property if it exists', () => {
			const content = { primaryImage: true };
			expect(subject(content).image).to.be.true;
		});

	});

	context('hideTimeStampState', () => {

		it('sets to true if type is FastFt', () => {
			expect(subject({ type: 'FastFt' }).hideTimestampState).to.be.true;
		});

		it('sets to false if type is not fast-ft', () => {
			expect(subject({ type: 'other' }).hideTimestampState).to.be.false;
		});

		it('sets to false if type is not set', () => {
			expect(subject({}).hideTimestampState).to.be.false;
		});

	});

});
