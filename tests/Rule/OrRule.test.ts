/**
 * Copyright (c) SourceGem.
 * This code is licensed under the MIT License.
 * See the LICENSE file for more informations.
 *
 * Created by : Matthieu 'Raisenku' Arques <raisenku@sourcegem.com>
 */

import {expect} from 'chai';

import {OrRule, BooleanRule, BooleanRuleError, NumberRule, NumberRuleError, StringRule, RuleResult, ResultNodeOperator, ErrorResultNode} from '../../src';

describe('OrRule', function()
{
	it('fails validation if data passed doesn\'t match any of its subrules', function()
	{
		let rule = new OrRule(new BooleanRule(), new NumberRule());
		let result = new RuleResult(ResultNodeOperator.And, rule);

		rule.validate('this is neither a boolean nor a number', result);

		expect(result.nodes.length).to.equal(2);
		expect(result.nodes[0]).to.be.instanceOf(RuleResult);
		expect(result.nodes[1]).to.be.instanceOf(RuleResult);

		let node1 = <RuleResult>result.nodes[0];
		let node2 = <RuleResult>result.nodes[1];

		expect(node1.nodes.length).to.equal(1);
		expect(node2.nodes.length).to.equal(1);

		expect(node1.nodes[0]).to.be.instanceOf(ErrorResultNode);
		expect(node2.nodes[0]).to.be.instanceOf(ErrorResultNode);

		expect((<ErrorResultNode>node1.nodes[0]).error.name).to.equal(BooleanRuleError.Type);
		expect((<ErrorResultNode>node2.nodes[0]).error.name).to.equal(NumberRuleError.Type);
	});

	it('passes validation if data passed matches at least one of its subrules', function()
	{
		let rule = new OrRule(new StringRule({regex: /^[a-zA-Z0-9\-]{3,16}$/}), new StringRule({regex: /^\$(var1|var2)$/}));
		let result = new RuleResult(ResultNodeOperator.And, rule);

		rule.validate('short-slug', result);
		expect(result.nodes.length).to.equal(0);

		rule.validate('$var2', result);
		expect(result.nodes.length).to.equal(0);
	});
});