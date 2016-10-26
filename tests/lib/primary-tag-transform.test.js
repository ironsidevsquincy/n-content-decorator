const expect = require('chai').expect;
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const tagTransformStub = sinon.stub();
const excludedTaxonomiesStub = sinon.stub();

const subject = proxyquire('../../lib/primary-tag-transform', {
	'./tag-transform': tagTransformStub,
	'./utils/excluded-taxonomies': excludedTaxonomiesStub
});

tagTransformStub.returnsArg(0);
const excludedTaxonomies = ['organisations', 'regions', 'people'];
excludedTaxonomiesStub.withArgs({ excludeTaxonomies: true }).returns(excludedTaxonomies);
excludedTaxonomiesStub.withArgs({ excludeTaxonomies: false }).returns([]);
excludedTaxonomiesStub.withArgs(undefined).returns([]);

describe('Primary Tags Transform', () => {

	context('graphQL API sourced content - ie. no metadata', () => {

		context('content already has a primaryTag', () => {

			it('returns the existing primary tag', () => {
				const content = { primaryTag: { existingPrimaryTag: true } };
				expect(subject(content).existingPrimaryTag).to.be.true;
			});

		});

		context('content has other primary attributes', () => {

			context('it has primaryTheme', () => {

				context('the primaryTheme does not match an excluded taxonomy', () => {

					it('returns the primary Theme', () => {
						const content = { primaryTheme: { taxonomy: 'non-matching', existingPrimaryTheme: true } };
						expect(subject(content, { excludeTaxonomies: true }).existingPrimaryTheme).to.be.true;
					});

				});

				context('the primaryTheme matches an excluded taxonomy', () => {

					const primaryTheme = { taxonomy: 'regions', existingPrimaryTheme: true };
					const primarySection = { taxonomy: 'regions', existingPrimarySection: true };

					it('with exclude option OFF returns the primarySection', () => {
						const content = { primaryTheme, primarySection };
						expect(subject(content, { excludeTaxonomies: true }).existingPrimarySection).to.be.true;
					});

					it('with exclude option ON returns the primaryTheme', () => {
						const content = { primaryTheme, primarySection };
						expect(subject(content, { excludeTaxonomies: false }).existingPrimaryTheme).to.be.true;
					});

				});

			});

			context('it only has a primary section', () => {

				const primarySection = { taxonomy: 'regions', existingPrimarySection: true };

				it('returns the primary section', () => {
					const content = { primarySection };
					expect(subject(content, { excludeTaxonomies: true }).existingPrimarySection).to.be.true;
				});

			});

			context('it has an excluded primary theme and branding', () => {

				const primaryTheme = { taxonomy: 'regions', existingPrimaryTheme: true };
				const branding = { taxonomy: 'brand', existingBranding: true};

				it('returns the primary section', () => {
					const content = { primaryTheme, branding };
					expect(subject(content, { excludeTaxonomies: true }).existingBranding).to.be.true;
				});

			});

			context('it has neither a primary section nor theme nor branding', () => {

				it('returns undefined', () => {
					const content = {};
					expect(subject(content, { excludeTaxonomies: true })).to.be.undefined;
				});

			});

		});

	});

	context('calculating the primary tag - no existing primaryTag', () => {

		const primaryTheme = {
			primary: 'theme'
		};
		const primarySection = {
			primary: 'section'
		};
		const primaryBrand = {
			primary: 'brand'
		};

		it('returns undefined if there is no metadata', () => {
			const content = {};
			expect(subject(content)).to.be.undefined;
		});


		it('First choice: Primary Theme', () => {
			const content = {metadata: [primaryTheme, primarySection, primaryBrand]};
			expect(subject(content).primary).to.equal('theme');
		});

		it('Second choice: Primary Section', () => {
			const content = {metadata: [primarySection, primaryBrand]};
			expect(subject(content).primary).to.equal('section');
		});

		it('Third choice: Primary Brand', () => {
			const content = {metadata: [primaryBrand]};
			expect(subject(content).primary).to.equal('brand');
		});

		it('returns undefined if no theme, section or brand', () => {
			const content = {metadata: []};
			expect(subject(content)).to.be.undefined;
		});

	});

	context('using the excludeTaxonomies option', () => {

		const primaryTheme = {
			primary: 'theme',
			taxonomy: 'organisations'
		};
		const primarySection = {
			primary: 'section'
		};

		it('does not return tags matching excluded taxonomies', () => {
			const content = {metadata: [primaryTheme, primarySection]};
				const result = subject(content, {excludeTaxonomies: true});
				expect(result.primary).to.equal('section');
		});
	});

});
