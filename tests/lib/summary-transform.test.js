const expect = require('chai').expect;

const subject = require('../../lib/summary-transform');

describe('Summary Transform', () => {

	context('content already has a summary property - sourced from graphQL Api', () => {

		it('returns the existing summary', () => {
			const content = { summary: 'existing summary' };
			expect(subject(content)).to.equal('existing summary');
		});
	});

	context('content sourced directly from Elastic Search (ES)', () => {

		it('picks the first summary from the array', () => {
			const content = require('../fixtures/basic-article.json');
			expect(subject(content)).to.equal('Rare intervention in White House race from US president while overseas');
		});

		it('returns null if there are no summaries', () => {
			expect(subject({})).to.be.null;
		});

	});

});
