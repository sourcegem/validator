/**
 * Copyright (c) SourceGem.
 * This code is licensed under the MIT License.
 * See the LICENSE file for more informations.
 *
 * Created by : Matthieu 'Aeres-Blade' Arques <aeresblade@sourcegem.com>
 */

import {expect} from 'chai';

import {BooleanRule, BooleanRuleError, RuleResult, ResultNodeOperator, ErrorResultNode} from '../../src';

describe('BooleanRule', function()
{
	it('fails validation when data given is not a boolean', function()
	{
		let rule = new BooleanRule();
		let result = new RuleResult(ResultNodeOperator.And, rule);

		rule.validate('this is not a boolean', result);

		expect(result.nodes.length).to.equal(1);
		expect(result.nodes[0]).to.be.instanceOf(ErrorResultNode);
		expect((<ErrorResultNode>result.nodes[0]).error.name).to.equal(BooleanRuleError.Type);

		result.clearNodes();
		rule.validate(null, result);

		expect(result.nodes.length).to.equal(1);
		expect(result.nodes[0]).to.be.instanceOf(ErrorResultNode);
		expect((<ErrorResultNode>result.nodes[0]).error.name).to.equal(BooleanRuleError.Null);

		result.clearNodes();
		rule.validate(true, result);

		expect(result.nodes.length).to.equal(0);
	});

	it('can be configured to allow null value', function()
	{
		let rule = new BooleanRule({nullable: true});
		let result = new RuleResult(ResultNodeOperator.And, rule);

		rule.validate(null, result);
		expect(result.nodes.length).to.equal(0);
	});
});