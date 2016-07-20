/*global describe, it, context*/

const expect = require('chai').expect;

const subject = require('../../lib/image-format-transform');

const fixtureLandscape = {
	'width': 2048,
	'height': 1152
};

const fixturePortrait = {
	'width': 1152,
	'height': 2048
};

const fixtureSquare = {
	'width': 1152,
	'height': 1152
};

describe('Image Format', () => {

	context('with a landscape image', () => {

		it('returns \'landscape\' as a string to be assigned as imageFormat value', () => {
			const result = subject(fixtureLandscape);
			expect(result).to.equal('landscape');
		});

	});

	context('with a portrait image', () => {

		it('returns \'portrait\' as a string to be assigned as imageFormat value', () => {
			const result = subject(fixturePortrait);
			expect(result).to.equal('portrait');
		});

	});

	context('with a square image', () => {

		it('returns \'square\' as a string to be assigned as imageFormat value', () => {
			const result = subject(fixtureSquare);
			expect(result).to.equal('square');
		});

	});

	context('with no main image', () => {

		it('returns undefined', () => {
			const result = subject(undefined);
			expect(result).to.be.undefined;
		});

	});

});
