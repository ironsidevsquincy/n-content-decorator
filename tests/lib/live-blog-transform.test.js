const expect = require('chai').expect;

const subject = require('../../lib/live-blog-transform');

describe('Live Blog Transform', () => {

	context('when type === LiveBlog', () => {

		const content = { type: 'LiveBlog' };

		it('returns status and latestUpdate properties', () => {
			expect(subject(content)).to.have.all.keys(['status', 'latestUpdate']);
		});

		context('latestUpdate property', () => {

			it('returns the most recent update from an array of updates', () => {
				content.updates = [1,2,3,4];
				expect(subject(content).latestUpdate).to.equal(1);
			});

			it('returns undefined if there are no updates', () => {
				content.updates = undefined;
				expect(subject(content).latestUpdate).to.be.undefined;
			});

		});

	});

	context('when type is not LiveBlog', () => {

		const content = { type: 'Other'};

		it('returns undefined', () => {
			expect(subject(content)).to.be.undefined;
		});

	});

});
