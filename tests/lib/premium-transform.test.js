const expect = require('chai').expect;

const subject = require('../../lib/premium-transform');

describe('Premium Transform', () => {

	it('ascertains from webUrl when content is premium', () => {
		const result = subject('http://www.ft.com/cms/s/3/768029c2-54b8-11e6-befd-2fc0c26b3c60.html');
		expect(result).to.be.true;
	});

	it('ascertains from webUrl when content is not premium', () => {
		const result = subject('http://www.ft.com/cms/s/0/7987e5c2-54b0-11e6-9664-e0bdc13c3bef.html');
		expect(result).to.be.false;
	});

});
