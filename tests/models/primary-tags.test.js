const expect = require('chai').expect;
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const tagTransformStub = sinon.stub();

const subject = proxyquire('../../models/primary-tags', {
	'../lib/tag-transform': tagTransformStub
});
const fixture = require('../fixtures/basic-article.json');

tagTransformStub.returnsArg(0);

describe('Primary Tags Transform', () => {

	context('overall response', () => {

		it('returns theme, section, brand and tag properties', () => {
			const result = subject(fixture);
			expect(result).to.have.all.keys([
				'primaryTheme',
				'primarySection',
				'primaryBrand',
				'primaryTag'
			]);
		});

		it('returns just the primaryTag if summary option passed', () => {
			const result = subject(fixture, 'summary');
			expect(result).to.have.all.keys([
				'primaryTag'
			]);

		});

	});

	context('calculating the primary tag', () => {

		const primaryTheme = {
			primary: 'theme'
		};
		const primarySection = {
			primary: 'section'
		};
		const primaryBrand = {
			primary: 'brand'
		};


		it('First choice: Primary Theme', () => {
			const content = {metadata: [primaryTheme, primarySection, primaryBrand]};
			const result = subject(content);
			expect(result.primaryTag.primary).to.equal('theme');
		});

		it('Second choice: Primary Section', () => {
			const content = {metadata: [primarySection, primaryBrand]};
			const result = subject(content);
			expect(result.primaryTag.primary).to.equal('section');
		});

		it('Third choice: Primary Brand', () => {
			const content = {metadata: [primaryBrand]};
			const result = subject(content);
			expect(result.primaryTag.primary).to.equal('brand');
		});

		it('returns undefined if no theme, section or brand', () => {
			const content = {metadata: []};
			const result = subject(content);
			expect(result.primaryTag).to.be.undefined;
		});

	});

});
