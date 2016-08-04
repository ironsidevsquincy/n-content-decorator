const expect = require('chai').expect;

const subject = require('../../models/basic');
const content = require('../fixtures/basic-article.json');

describe('Basic model transform', () => {

	it('returns the expected properties', () => {
		const result = subject(content);
		expect(Object.keys(result).length).to.equal(5);
		expect(result).to.have.all.keys([
			'id',
			'url',
			'title',
			'published',
			'lastPublished'
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

});
