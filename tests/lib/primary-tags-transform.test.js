/*global describe, it, context*/
'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const tagTransformStub = sinon.stub();

const subject = proxyquire('../../lib/primary-tags-transform', {
	'./tag-transform': tagTransformStub
});
const fixture = require('../fixtures/basic-article.json');

tagTransformStub.returnsArg(0);

describe('Primary Tags Transform', () => {

	context('overall response', () => {

		it('returns theme, section, brand and tag properties', () => {
			const result = subject(fixture.metadata);
			expect(Object.keys(result).length).to.equal(4);
			expect(result).to.have.all.keys([
				'primaryTheme',
				'primarySection',
				'primaryBrand',
				'primaryTag'
			]);
		});

	});

	context('calculating the primary tag', () => {

		const primaryTheme = {
			primary: "theme"
		};
		const primarySection = {
			primary: "section"
		};
		const primaryBrand = {
			primary: "brand"
		};


		it('First choice: Primary Theme', () => {
			const metadata = [primaryTheme, primarySection, primaryBrand];
			const result = subject(metadata);
			expect(result.primaryTag.primary).to.equal('theme');
		});

		it('Second choice: Primary Section', () => {
			const metadata = [primarySection, primaryBrand];
			const result = subject(metadata);
			expect(result.primaryTag.primary).to.equal('section');
		});

		it('Third choice: Primary Brand', () => {
			const metadata = [primaryBrand];
			const result = subject(metadata);
			expect(result.primaryTag.primary).to.equal('brand');
		});

		it('returns undefined if no theme, section or brand', () => {
			const metadata = [];
			const result = subject(metadata);
			expect(result.primaryTag).to.be.undefined;
		});

	});

});
