/*global describe, it*/

'use strict';

const expect = require('chai').expect;
const subject = require('../../lib/subheading-transform');

describe('Subheading', () => {

		describe('Has a summary', () => {
			let fixture = {
				summaries: ['This is a longer summary', 'This isn\'t']
			};

			it('should use the first summary', () => {
				expect(subject(fixture)).to.equal('This is a longer summary');
			});
		});

		describe('Has no summary but an opening', () => {
			let fixture = {
				summaries: [],
				openingXML: '<p>Text <a href="http://www.ft.com/">Link Text</a></p><p>Ignored</p>'
			};

			it('should take text of first p of opening', () => {
				expect(subject(fixture)).to.equal('Text Link Text');
			});

		});

		describe('Has no summary or opening, but does have a bodyXML', () => {
			let fixture = {
				summaries: [],
				openingXML: undefined,
				bodyXML: '<p>Text <a href="http://www.ft.com/">Link Text</a></p><p>Ignored</p>'
			};

			it('should use the text of the first p of bodyXML', () => {
				expect(subject(fixture)).to.equal('Text Link Text');
			});

		});
});
