const expect = require('chai').expect;
const proxyquire = require('proxyquire');

const subject = proxyquire('../../lib/image-transform', {
	'./image-ratio-transform': () => true
});

const fixtureES = {
	'title': 'Barack Obama among Group of Seven leaders at Ise',
	'description': 'ISE, JAPAN - MAY 26: (Photo by Chung Sung-Jun/Getty Images)',
	'url': 'http://com.ft.imagepublish.prod.s3.amazonaws.com/c8f995d6-2325-11e6-aa98-db1e01fabc0c',
	'width': 2048,
	'height': 1152
};

const fixtureGraphQlApi = {
	'rawSrc': 'http://com.ft.imagepublish.prod.s3.amazonaws.com/c8f995d6-2325-11e6-aa98-db1e01fabc0c'
};


describe('Primary Image Transform', () => {

	context('with an Elastic Source sourced image', () => {

		it('returns the main image with ratio and url properties', () => {
			const result = subject(fixtureES);
			expect(Object.keys(result).length).to.equal(2);
			expect(result).to.have.all.keys(['ratio', 'url']);
			expect(result.url).to.equal('http://com.ft.imagepublish.prod.s3.amazonaws.com/c8f995d6-2325-11e6-aa98-db1e01fabc0c');
		});

	});

	context('with a graphQL Api sourced image', () => {

		it('returns the main image with ratio and url properties', () => {
			const result = subject(fixtureGraphQlApi);
			expect(Object.keys(result).length).to.equal(2);
			expect(result).to.have.all.keys(['ratio', 'url']);
			expect(result.url).to.equal('http://com.ft.imagepublish.prod.s3.amazonaws.com/c8f995d6-2325-11e6-aa98-db1e01fabc0c');
		});

	});

	context('with no main image', () => {

		it('returns undefined', () => {
			const result = subject(undefined);
			expect(result).to.be.undefined;
		});

	});

});
