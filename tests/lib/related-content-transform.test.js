const expect = require('chai').expect;

const subject = require('../../lib/related-content-transform');

describe('Related Content Transform', () => {

	const content = { id: 'a' };

	context('with related content', () => {

		it('filters out any related content that duplicates the main content', () => {
			content.relatedContent = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
			expect(subject(content)).to.not.include({ id: 'a' });
		});

		it('reduces the number of related to content items to the initial 3', () => {
			content.relatedContent = [{ id: 'b' }, { id: 'c' }, { id: 'd' }, { id: 'e' }];
			expect(subject(content).length).to.equal(3);
		});

	});

	context('without related content', () => {

		it('returns an empty array', () => {
			content.relatedContent = undefined;
			expect(subject(content)).to.deep.equal([]);
			expect(subject(content).length).to.equal(0);
		});

	});

});
