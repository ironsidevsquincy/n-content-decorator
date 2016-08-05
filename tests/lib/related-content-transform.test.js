'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const primaryTagTransformStub = sinon.stub();

const subject = proxyquire('../../lib/related-content-transform', {
	'./primary-tag-transform': primaryTagTransformStub
});

describe('Related Content Transform', () => {

	beforeEach(() => {
		primaryTagTransformStub.reset();
	});

	context('with related content', () => {

		let content;

		beforeEach(() => {
			content = { id: 'a' };
		});

		it('filters out any related content that duplicates the main content', () => {
			content.relatedContent = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
			expect(subject(content)).to.not.include({ id: 'a' });
		});

		it('reduces the number of related to content items to the initial 3', () => {
			content.relatedContent = [{ id: 'b' }, { id: 'c' }, { id: 'd' }, { id: 'e' }];
			expect(subject(content).length).to.equal(3);
		});

	});

	context('without related content', () => {

		let content;

		beforeEach(() => {
			content = { id: 'a', relatedContent: [] };
		});

		context('with primaryTheme or primarySection', () => {

			const tag = { taxonomy: 'other', items: ['aa', 'bb', 'cc'] };
			const tagNoItems = { taxonomy: 'other' };

			context('with primaryTheme - not filtered out', () => {

				beforeEach(() => {
					primaryTagTransformStub.returns(tag);
				});

				it('returns primaryTheme items', () => {
					content.primaryTheme = tag;
					expect(subject(content)).to.deep.equal(tag.items);
				});

			});

			context('with primaryTheme - is filtered out, no primary section', () => {

				beforeEach(() => {
					primaryTagTransformStub.returns([]);
				});

				it('returns primaryTheme items', () => {
					content.primaryTheme = tag;
					expect(subject(content)).to.deep.equal([]);
				});

			});

			context('with primaryTheme - is filtered out, has primary section', () => {

				beforeEach(() => {
					primaryTagTransformStub.returns(tag);
				});

				it('returns primaryTheme items', () => {
					content.primaryTheme = { taxonomy: 'people', items: ['zz', 'yy', 'xx'] };
					content.primarySection = tag;
					expect(subject(content)).to.deep.equal(tag.items);
				});

			});

			context('primary theme, not filtered out, but doesn\'t have related items', () => {

				beforeEach(() => {
					primaryTagTransformStub.returns(tagNoItems);
				});

				it('returns primaryTheme items', () => {
					content.primaryTheme = tagNoItems;
					expect(subject(content)).to.deep.equal([]);
				});

			});

		});

		context('with no possible source', () => {

			it('returns an empty array', () => {
				content.relatedContent = undefined;
				expect(subject(content)).to.deep.equal([]);
				expect(subject(content).length).to.equal(0);
			});

		});


	});

});
