const expect = require('chai').expect;
const subject = require('../../../lib/utils/is-comment-tag');

describe('Is Comment Tag Utility', () => {

	context('with a tag', () => {

		context('graphQL api sourced tag', () => {

			context('with id property', () => {

				it('returns true', () => {
					const tag = { taxonomy: 'genre', id: 'OA==-R2VucmVz' };
					expect(subject(tag)).to.be.true;
				});

			});

			context('without id property but with name property', () => {

				it('returns true', () => {
					const tag = { taxonomy: 'genre', name: 'Comment' };
					expect(subject(tag)).to.be.true;
				});

			});

		});

		context('elastic search sourced tag', () => {

			context('with idV1 property', () => {

				it('returns true', () => {
					const tag = { taxonomy: 'genre', idV1: 'OA==-R2VucmVz' };
					expect(subject(tag)).to.be.true;
				});

			});

		});

		context('with no matching properties', () => {

			it('returns false', () => {
				const tag = { taxonomy: 'genre', idV1: 'OtherID' };
				expect(subject(tag)).to.be.false;
			});

		});

	});

	context('without a tag', () => {

		it('returns undefined', () => {
			const tag = undefined;
			expect(subject(tag)).to.be.undefined;
		});

	});

});
