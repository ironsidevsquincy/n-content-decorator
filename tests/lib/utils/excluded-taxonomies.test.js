const expect = require('chai').expect;
const subject = require('../../../lib/utils/excluded-taxonomies');

describe('Excluded Taxonomies Utility', () => {

	context('with options', () => {

		context('with excludedTaxonomies true', () => {

			it('returns an array of excluded taxonomies', () => {
				const options = { excludeTaxonomies: true };
				const result = subject(options);
				expect(Array.isArray(result)).to.be.true;
				expect(result.length).to.be.above(0);
			});

	});

		context('with excludedTaxonomies false', () => {

			it('returns an empty array', () => {
				const options = { excludeTaxonomies: false };
				const result = subject(options);
				expect(Array.isArray(result)).to.be.true;
				expect(result.length).to.equal(0);
			});

		});

	});

	context('without options', () => {

		it('returns an empty array', () => {
			const options = undefined;
			const result = subject(options);
			expect(Array.isArray(result)).to.be.true;
			expect(result.length).to.equal(0);
		});

	});

});
