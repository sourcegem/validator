/**
 * Copyright (c) SourceGem.
 * This code is licensed under the MIT License.
 * See the LICENSE file for more informations.
 *
 * Created by : Matthieu 'Raisenku' Arques <raisenku@sourcegem.com>
 */

import {expect} from 'chai';

import {ArrayableRule, BooleanRule, BooleanRuleError, ArrayRuleError, RuleResult, ResultNodeOperator, ErrorResultNode} from '../../src';

describe('ArrayableRule', function()
{
	it('passes validation if data passed matches the subrule', function()
	{
		let rule = new ArrayableRule(new BooleanRule());
		let result = new RuleResult(ResultNodeOperator.And, rule);

		rule.validate(true, result);
		expect(result.nodes.length).to.equal(0);
	});

	it('passes validation if data passed is an array of elements that match the subrule', function()
	{
		let rule = new ArrayableRule(new BooleanRule({nullable: true}));
		let result = new RuleResult(ResultNodeOperator.And, rule);

		rule.validate([true, false, null], result);
		expect(result.nodes.length).to.equal(0);
	});

	it('fails validation in any other case', function()
	{
		let rule = new ArrayableRule(new BooleanRule());
		let result = new RuleResult(ResultNodeOperator.And, rule);

		rule.validate('this is neither a boolean nor an array', result);

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
		expect((<ErrorResultNode>node2.nodes[0]).error.name).to.equal(ArrayRuleError.Type);

		result.clearNodes();
		rule.validate([true, 'this is not a boolean'], result);

		expect(result.nodes.length).to.equal(2);
		expect(result.nodes[1]).to.be.instanceOf(RuleResult);

		let node = <RuleResult>result.nodes[1];
		expect(node.nodes.length).to.equal(1);
		expect(node.nodes[0]).to.be.instanceOf(RuleResult);

		node = <RuleResult>node.nodes[0];
		expect(node.nodes.length).to.equal(1);
		expect(node.nodes[0]).to.be.instanceOf(ErrorResultNode);
		expect((<ErrorResultNode>node.nodes[0]).error.name).to.equal(BooleanRuleError.Type);
	});

	it('can take a set of options for the ArrayRule', function()
	{
		let rule = new ArrayableRule(new BooleanRule(), {minSize: 1});
		let result = new RuleResult(ResultNodeOperator.And, rule);

		rule.validate([], result);

		expect(result.nodes.length).to.equal(2);
		expect(result.nodes[1]).to.be.instanceOf(RuleResult);

		let node = <RuleResult>result.nodes[1];
		expect(node.nodes.length).to.equal(1);
		expect(node.nodes[0]).to.be.instanceOf(ErrorResultNode);
		expect((<ErrorResultNode>node.nodes[0]).error.name).to.equal(ArrayRuleError.MinSize);
	});
});