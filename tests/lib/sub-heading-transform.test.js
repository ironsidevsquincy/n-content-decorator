/*global describe, it*/

'use strict';

const expect = require('chai').expect;
const subject = require('../../lib/subheading-transform');

describe('Subheading', () => {

		context('Has a summary', () => {
			let fixture = {
				summaries: ['This is a longer summary', 'This isn\'t']
			};

			it('should use the first summary', () => {
				expect(subject(fixture)).to.equal('This is a longer summary');
			});
		});

		context('Has no summary but an opening', () => {
			let fixture = {
				summaries: [],
				openingHTML: '<p>Text <a href="http://www.ft.com/">Link Text</a></p><p>Ignored</p>'
			};

			it('should take text of first p of opening', () => {
				expect(subject(fixture)).to.equal('Text Link Text');
			});

		});

		context('Has no summary or opening, but does have a bodyHTML', () => {
			let fixture = {
				summaries: [],
				openingHTML: undefined,
				bodyHTML: '<p>Text <a href="http://www.ft.com/">Link Text</a></p><p>Ignored</p>'
			};

			it('should use the text of the first p of bodyHTML', () => {
				expect(subject(fixture)).to.equal('Text Link Text');
			});

		});

		context('Has nothing resembling a summary', () => {
			let fixture = {
				summaries: [],
				openingHTML: undefined,
				bodyHTML: undefined
			};

			it('should return undefined', () => {
				expect(subject(fixture)).to.be.undefined;
			});

		});
});
