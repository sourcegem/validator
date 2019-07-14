/**
 * Copyright (c) SourceGem.
 * This code is licensed under the MIT License.
 * See the LICENSE file for more informations.
 *
 * Created by : Matthieu 'Aeres-Blade' Arques <aeresblade@sourcegem.com>
 */

import {expect} from 'chai';

import {ObjectRule, ObjectRuleError, BooleanRule, NumberRule, NumberRuleError, RuleResult, ResultNodeOperator, ErrorResultNode} from '../../src';

describe('ObjectRule', function()
{
	it('fails validation when data given is not an object', function()
	{
		let rule = new ObjectRule({});
		let result = new RuleResult(ResultNodeOperator.And, rule);

		rule.validate('this is not an object', result);

		expect(result.nodes.length).to.equal(1);
		expect(result.nodes[0]).to.be.instanceOf(ErrorResultNode);
		expect((<ErrorResultNode>result.nodes[0]).error.name).to.equal(ObjectRuleError.Type);

		result.clearNodes();
		rule.validate({}, result);

		expect(result.nodes.length).to.equal(0);
	});

	it('fails validation when a key is missing in the data object', function()
	{
		let rule = new ObjectRule({foo: new BooleanRule()});
		let result = new RuleResult(ResultNodeOperator.And, rule);

		rule.validate({bar: true}, result);

		expect(result.nodes.length).to.equal(1);
		expect(result.nodes[0]).to.be.instanceOf(ErrorResultNode);
		expect((<ErrorResultNode>result.nodes[0]).error.name).to.equal(ObjectRuleError.MissingElement);
	});

	it('concatenates validation errors', function()
	{
		let rule = new ObjectRule({
			foo: new BooleanRule(),
			bar: new NumberRule({min: 0})
		});

		let result = new RuleResult(ResultNodeOperator.And, rule);
		rule.validate({bar: -5}, result);

		expect(result.nodes.length).to.equal(2);
		expect(result.nodes[0]).to.be.instanceOf(ErrorResultNode);
		expect(result.nodes[1]).to.be.instanceOf(RuleResult);
		expect((<ErrorResultNode>result.nodes[0]).error.name).to.equal(ObjectRuleError.MissingElement);

		let node = <RuleResult>result.nodes[1];

		expect(node.nodes.length).to.equal(1);
		expect(node.nodes[0]).to.be.instanceOf(ErrorResultNode);
		expect((<ErrorResultNode>node.nodes[0]).error.name).to.equal(NumberRuleError.Min);
	});

	it('can have its structure elements configured to be optional', function()
	{
		let rule = new ObjectRule({
			foo: {rule: new BooleanRule(), options: {optional: true}}
		});

		let result = new RuleResult(ResultNodeOperator.And, rule);
		rule.validate({}, result);

		expect(result.nodes.length).to.equal(0);
	});
});