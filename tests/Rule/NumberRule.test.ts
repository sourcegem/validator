/**
 * Copyright (c) SourceGem.
 * This code is licensed under the MIT License.
 * See the LICENSE file for more informations.
 *
 * Created by : Matthieu 'Raisenku' Arques <raisenku@sourcegem.com>
 */

import {expect} from 'chai';

import {NumberRule, NumberRuleError, RuleResult, ResultNodeOperator, ErrorResultNode} from '../../src';

describe('NumberRule', function()
{
	it('fails validation when data given is not a number', function()
	{
		let rule = new NumberRule();
		let result = new RuleResult(ResultNodeOperator.And, rule);

		rule.validate('this is not a number', result);

		expect(result.nodes.length).to.equal(1);
		expect(result.nodes[0]).to.be.instanceOf(ErrorResultNode);
		expect((<ErrorResultNode>result.nodes[0]).error.name).to.equal(NumberRuleError.Type);

		result.clearNodes();
		rule.validate(null, result);

		expect(result.nodes.length).to.equal(1);
		expect(result.nodes[0]).to.be.instanceOf(ErrorResultNode);
		expect((<ErrorResultNode>result.nodes[0]).error.name).to.equal(NumberRuleError.Null);

		result.clearNodes();
		rule.validate(10, result);

		expect(result.nodes.length).to.equal(0);
	});

	it('can be configured to allow null value', function()
	{
		let rule = new NumberRule({nullable: true});
		let result = new RuleResult(ResultNodeOperator.And, rule);

		rule.validate(null, result);
		expect(result.nodes.length).to.equal(0);
	});

	it('can be configured to have a min value', function()
	{
		let rule = new NumberRule({min: 0});
		let result = new RuleResult(ResultNodeOperator.And, rule);

		rule.validate(-10, result);

		expect(result.nodes.length).to.equal(1);
		expect(result.nodes[0]).to.be.instanceOf(ErrorResultNode);
		expect((<ErrorResultNode>result.nodes[0]).error.name).to.equal(NumberRuleError.Min);

		result.clearNodes();
		rule.validate(10, result);

		expect(result.nodes.length).to.equal(0);
	});

	it('can be configured to have a max value', function()
	{
		let rule = new NumberRule({max: 20});
		let result = new RuleResult(ResultNodeOperator.And, rule);

		rule.validate(30, result);

		expect(result.nodes.length).to.equal(1);
		expect(result.nodes[0]).to.be.instanceOf(ErrorResultNode);
		expect((<ErrorResultNode>result.nodes[0]).error.name).to.equal(NumberRuleError.Max);

		result.clearNodes();
		rule.validate(5, result);

		expect(result.nodes.length).to.equal(0);
	});

	it('can be configured to allow floating numbers', function()
	{
		let rule = new NumberRule();
		let result = new RuleResult(ResultNodeOperator.And, rule);

		rule.validate(2.5, result);

		expect(result.nodes.length).to.equal(1);
		expect(result.nodes[0]).to.be.instanceOf(ErrorResultNode);
		expect((<ErrorResultNode>result.nodes[0]).error.name).to.equal(NumberRuleError.Float);

		rule = new NumberRule({floating: true});
		result = new RuleResult(ResultNodeOperator.And, rule);

		rule.validate(2.5, result);

		expect(result.nodes.length).to.equal(0);
	});

	it('can push multiple errors at once', function()
	{
		let rule = new NumberRule({min: 0});
		let result = new RuleResult(ResultNodeOperator.And, rule);

		rule.validate(-2.5, result);

		expect(result.nodes.length).to.equal(2);
		expect(result.nodes[0]).to.be.instanceOf(ErrorResultNode);
		expect(result.nodes[1]).to.be.instanceOf(ErrorResultNode);
		expect((<ErrorResultNode>result.nodes[0]).error.name).to.equal(NumberRuleError.Float);
		expect((<ErrorResultNode>result.nodes[1]).error.name).to.equal(NumberRuleError.Min);
	});
});