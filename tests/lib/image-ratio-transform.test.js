const expect = require('chai').expect;

const subject = require('../../lib/image-ratio-transform');

describe('Image Ratio Transform', () => {

	it('returns a number when width and height attributes are present', () => {
		const mainImage = { width: 1600 , height: 900 };
		expect(subject(mainImage)).to.not.be.NaN;
	});

	it('returns undefined if no dimension attributes', () => {
		const mainImage = {};
		expect(subject(mainImage)).to.be.undefined;
	});

	it('returns undefined if there is no main image', () => {
		const mainImage = undefined;
		expect(subject(mainImage)).to.be.undefined;
	});

});
