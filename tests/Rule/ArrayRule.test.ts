/**
 * Copyright (c) SourceGem.
 * This code is licensed under the MIT License.
 * See the LICENSE file for more informations.
 *
 * Created by : Matthieu 'Aeres-Blade' Arques <aeresblade@sourcegem.com>
 */

import {expect} from 'chai';

import {ArrayRule, ArrayRuleError, BooleanRule, NumberRule, NumberRuleError, RuleResult, ResultNodeOperator, ErrorResultNode} from '../../src';

describe('ArrayRule', function()
{
	it('fails validation when data given is not an array', function()
	{
		let rule = new ArrayRule(new BooleanRule());
		let result = new RuleResult(ResultNodeOperator.And, rule);

		rule.validate('this is not an array', result);
		expect(result.nodes.length).to.equal(1);
		expect(result.nodes[0]).to.be.instanceOf(ErrorResultNode);
		expect((<ErrorResultNode>result.nodes[0]).error.name).to.equal(ArrayRuleError.Type);
	});

	it('concatenates validation errors from subrule', function()
	{
		let rule = new ArrayRule(new NumberRule({min: 10, max: 20}));
		let result = new RuleResult(ResultNodeOperator.And, rule);

		rule.validate([null, 5], result);

		expect(result.nodes.length).to.equal(2);
		expect(result.nodes[0]).to.be.instanceOf(RuleResult);
		expect(result.nodes[1]).to.be.instanceOf(RuleResult);

		let node1 = <RuleResult>result.nodes[0];
		let node2 = <RuleResult>result.nodes[1];

		expect(node1.nodes.length).to.equal(1);
		expect(node2.nodes.length).to.equal(1);

		expect(node1.nodes[0]).to.be.instanceOf(ErrorResultNode);
		expect(node2.nodes[0]).to.be.instanceOf(ErrorResultNode);

		expect((<ErrorResultNode>node1.nodes[0]).error.name).to.equal(NumberRuleError.Null);
		expect((<ErrorResultNode>node2.nodes[0]).error.name).to.equal(NumberRuleError.Min);
	});

	it('can be configured to have a minimum length', function()
	{
		let rule = new ArrayRule(new NumberRule(), {minSize: 1});
		let result = new RuleResult(ResultNodeOperator.And, rule);

		rule.validate([], result);

		expect(result.nodes.length).to.equal(1);
		expect(result.nodes[0]).to.be.instanceOf(ErrorResultNode);
		expect((<ErrorResultNode>result.nodes[0]).error.name).to.equal(ArrayRuleError.MinSize);
	});

	it('can be configured to have a maximum length', function()
	{
		let rule = new ArrayRule(new NumberRule(), {maxSize: 3});
		let result = new RuleResult(ResultNodeOperator.And, rule);

		rule.validate([1, 2, 3, 4], result);

		expect(result.nodes.length).to.equal(1);
		expect(result.nodes[0]).to.be.instanceOf(ErrorResultNode);
		expect((<ErrorResultNode>result.nodes[0]).error.name).to.equal(ArrayRuleError.MaxSize);
	});
});