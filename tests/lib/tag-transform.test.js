const expect = require('chai').expect;

const subject = require('../../lib/tag-transform');

const fixtureES = {
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

const fixtureGraphQLApi = {
	'id': 'TnN0ZWluX09OX0FGVE1fT05fMTQyMTAz-T04=',
	'name': 'G7',
	'taxonomy': 'organisations',
	'attributes': [
		{
			'key': 'is_company',
			'value': 'false'
		}
	]
};

describe('Tag Transformation', () => {

	context('with an Elastic Search (ES) sourced tag', () => {

		const result = subject(fixtureES);

		it('transforms the tag into neat model', () => {
			expect(Object.keys(result).length).to.equal(7);
			expect(result).to.have.all.keys([
				'id',
				'url',
				'name',
				'title',
				'taxonomy',
				'headshot',
				'items'
			]);
		});

		it('maps the correct values for id and name', () => {
			expect(result.id).to.equal('TnN0ZWluX09OX0FGVE1fT05fMTQyMTAz-T04=');
			expect(result.name).to.equal('G7');
		});

		it('formats the url for the tag', () => {
			expect(result.url).to.equal('/stream/organisationsId/TnN0ZWluX09OX0FGVE1fT05fMTQyMTAz-T04=')
		});
	});

	context('with a graphQL Api sourced tag', () => {

		it('maps the correct values for id and name', () => {
			const result = subject(fixtureGraphQLApi);
			expect(result.id).to.equal('TnN0ZWluX09OX0FGVE1fT05fMTQyMTAz-T04=');
			expect(result.name).to.equal('G7');
		});
	});


	context('without a tag', () => {

		it('returns undefined', () => {
			const result = subject(undefined);
			expect(result).to.be.undefined;
		});

	});

});
