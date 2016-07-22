const expect = require('chai').expect;

const subject = require('../../lib/tag-transform');

const fixture = {
	'idV1': 'TnN0ZWluX09OX0FGVE1fT05fMTQyMTAz-T04=',
	'prefLabel': 'G7',
	'taxonomy': 'organisations',
	'attributes': [
		{
			'key': 'is_company',
			'value': 'false'
		}
	]
};

describe('Tag Transformation', () => {

	context('with a tag', () => {

		const result = subject(fixture);

		it('transforms the tag into neat model', () => {
			expect(Object.keys(result).length).to.equal(4);
			expect(result).to.have.all.keys([
				'id',
				'url',
				'name',
				'taxonomy'
			]);
		});

		it('formats the url for the tag', () => {
			expect(result.url).to.equal('/stream/organisationsId/TnN0ZWluX09OX0FGVE1fT05fMTQyMTAz-T04=')
		});
	});

	context('without a tag', () => {

		it('returns undefined', () => {
			const result = subject(undefined);
			expect(result).to.be.undefined;
		});

	});

});
