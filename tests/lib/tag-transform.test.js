'use strict';

const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const premiumTransformStub = sinon.stub();
const subject = proxyquire('../../lib/tag-transform', {
	'./premium-transform': premiumTransformStub
});

const fixtureES = {
	'idV1': 'TnN0ZWluX09OX0FGVE1fT05fMTQyMTAz-T04=',
	'prefLabel': 'G7',
	'taxonomy': 'organisations',
	'attributes': [
		{
			'key': 'is_company',
			'value': 'false'
		}
	],
	'url': 'https://www.ft.com/topics/organisations/G7'
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
	],
	'url': 'https://www.ft.com/topics/organisations/G7',
	'items': [
		{
			'id': 'relatedItemId',
			'url': 'relatedItemUrl',
			'webUrl': 'relatedItemWebUrl',
			'isPremium': 'isPremiumValue',
			'title': 'relatedItemTitle'
		}
	]
};

describe('Tag Transformation', () => {

	afterEach(() => {
		premiumTransformStub.reset();
	});

	let result;

	context('with an Elastic Search (ES) sourced tag', () => {

		result = subject(fixtureES);

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
			expect(result.url).to.equal('/topics/organisations/G7');
		});
	});

	context('with a graphQL API sourced tag', () => {

		beforeEach(() => {
			premiumTransformStub.returns(true);
			result = subject(fixtureGraphQLApi);
		});

		it('maps the correct values for id and name', () => {
			expect(result.id).to.equal('TnN0ZWluX09OX0FGVE1fT05fMTQyMTAz-T04=');
			expect(result.name).to.equal('G7');
		});

		it('formats the url for the tag', () => {
			expect(result.url).to.equal('/topics/organisations/G7');
		});

	});

	context('acquiring premium status of related items from a graphQL API sourced tag', () => {

		beforeEach(() => {
			premiumTransformStub.returns(true);
		});

		it('uses its isPremium value (if present) to ascertain premium status of content', () => {
			result = subject(fixtureGraphQLApi);
			expect(result.items[0].isPremium).to.equal('isPremiumValue');
			expect(premiumTransformStub.called).to.be.false;
		});

		it('calls premiumTransform (if only webUrl value is present) to ascertain premium status of content', () => {
			fixtureGraphQLApi.items[0] = { webUrl: 'webUrlValue' };
			result = subject(fixtureGraphQLApi);
			expect(result.items[0].isPremium).to.equal(true);
			expect(premiumTransformStub.called).to.be.true;
		});

		it('does not call premiumTransform (if neither isPremium nor webUrl are present) and premium status of content will be undefined', () => {
			fixtureGraphQLApi.items[0] = { };
			result = subject(fixtureGraphQLApi);
			expect(result.items[0].isPremium).to.equal(undefined);
			expect(premiumTransformStub.called).to.be.false;
		});

	});

	context('with a graphQL API sourced tag which has no related items', () => {

		it('acquires the premium status for its related items by calling premiumTransform', () => {
			premiumTransformStub.returns(true);
			fixtureGraphQLApi.items = null;
			subject(fixtureGraphQLApi);
			expect(premiumTransformStub.called).to.be.false;
		});

	});

	context('without a tag', () => {

		it('returns undefined', () => {
			const result = subject(undefined);
			expect(result).to.be.undefined;
		});

	});

});
