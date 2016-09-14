const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const premiumTransformStub = sinon.stub();
const subject = proxyquire('../../models/basic', {
	'../lib/premium-transform': premiumTransformStub
});
const content = require('../fixtures/basic-article.json');

describe('Basic model transform', () => {

	afterEach(() => {
		premiumTransformStub.reset();
	});

	it('returns the expected properties', () => {
		const result = subject(content);
		expect(Object.keys(result).length).to.equal(5);
		expect(result).to.have.all.keys([
			'url',
			'fullUrl',
			'published',
			'lastPublished',
			'isPremium'
		]);
	});

	context('url property', () => {

		it('reformats the url to strip out https://www.ft.com', () => {
			const result = subject({ url: 'https://www.ft.com/content/id'});
			expect(result.url).to.equal('/content/id');
		});

		it('returns undefined if no url property', () => {
			const result = subject({ });
			expect(result.url).to.be.undefined;
		});

		it('maintains any non ft.com url', () => {
			const result = subject({ url: 'https://www.anotherdomain.com/1234'});
			expect(result.url).to.equal('https://www.anotherdomain.com/1234');
		});

	});

	context('published date properties', () => {

		context('with published and lastPublished properties', () => {

			it('returns those values', () => {
				const result = subject({ published: 'p', lastPublished: 'lp' });
				expect(result.published).to.equal('p');
				expect(result.lastPublished).to.equal('lp');
			});

		});

		context('with initialPublishedDate and publishedDate', () => {

			it('returns those values', () => {
				const result = subject({ initialPublishedDate: 'ipd', publishedDate: 'pd' });
				expect(result.published).to.equal('ipd');
				expect(result.lastPublished).to.equal('pd');
			});

		});

	});

	context('premium property', () => {

		context('content has an isPremium value but no webUrl attribute', () => {

			it('will use isPremium value to ascertain premium status of content', () => {
				const result = subject({ isPremium: 'isPremiumValue' });
				expect(premiumTransformStub.calledOnce).to.be.false;
				expect(result.isPremium).to.equal('isPremiumValue');
			});

		});

		context('content has a webUrl value but no isPremium attribute', () => {

			it('will call premiumTransform to ascertain premium status of content', () => {
				subject({ webUrl: 'webUrlValue' });
				expect(premiumTransformStub.calledOnce).to.be.true;
			});

		});

		context('content has both an isPremium and webUrl value', () => {

			it('will prioritise isPremium value to ascertain premium status of content', () => {
				const result = subject({ isPremium: 'isPremiumValue', webUrl: 'webUrlValue' });
				expect(premiumTransformStub.calledOnce).to.be.false;
				expect(result.isPremium).to.equal('isPremiumValue');
			});

		});

		context('content has neither an isPremium attribute nor a webUrl attribute', () => {

			it('will not call premiumTransform and premium status of content will be undefined', () => {
				const result = subject({ });
				expect(premiumTransformStub.called).to.be.false;
				expect(result.isPremium).to.equal(undefined);
			});

		});

	});

});
