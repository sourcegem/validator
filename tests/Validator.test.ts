/**
 * Copyright (c) SourceGem.
 * This code is licensed under the MIT License.
 * See the LICENSE file for more informations.
 *
 * Created by : Matthieu 'Raisenku' Arques <raisenku@sourcegem.com>
 */

import {expect} from 'chai';

import {Validator, BooleanRule, BooleanRuleError, ErrorResultNode} from '../src';

describe('Validator', function()
{
	it('uses a rule to validate data', function()
	{
		let validator = new Validator(new BooleanRule());

		let result = validator.validate(true);
		expect(result.nodes.length).to.equal(0);

		result = validator.validate('this is not a boolean');
		expect(result.nodes.length).to.equal(1);
		expect(result.nodes[0]).to.be.instanceOf(ErrorResultNode);
		expect((<ErrorResultNode>result.nodes[0]).error.name).to.equal(BooleanRuleError.Type);
	});
});