/*global describe, it, context*/
'use strict';

const expect = require('chai').expect;

const subject = require('../../lib/primary-image-transform');

const fixture = {
	"title": "Barack Obama among Group of Seven leaders at Ise",
	"description": "ISE, JAPAN - MAY 26: (Photo by Chung Sung-Jun/Getty Images)",
	"url": "http://com.ft.imagepublish.prod.s3.amazonaws.com/c8f995d6-2325-11e6-aa98-db1e01fabc0c",
	"width": 2048,
	"height": 1152
};

describe('Primary Image Transform', () => {

	context('with a main image', () => {

		it('returns the main image with a rawSrc property', () => {
			const result = subject(fixture);
			expect(Object.keys(result).length).to.equal(6);
			expect(result).to.contain.all.keys('rawSrc');
		});

	});

	context('with no main image', () => {

		it('returns undefined', () => {
			const result = subject(undefined);
			expect(result).to.be.undefined;
		});

	});

});
