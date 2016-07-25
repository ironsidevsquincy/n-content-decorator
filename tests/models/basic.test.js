const expect = require('chai').expect;

const subject = require('../../models/basic');
const content = require('../fixtures/basic-article.json');

describe('Basic model transform', () => {

	it('returns the expected properties', () => {
		const result = subject(content);
		expect(Object.keys(result).length).to.equal(6);
		expect(result).to.have.all.keys([
			'type',
			'id',
			'url',
			'title',
			'published',
			'lastPublished'
		]);
	});
});
