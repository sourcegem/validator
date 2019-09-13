/**
 * Copyright (c) SourceGem.
 * This code is licensed under the MIT License.
 * See the LICENSE file for more informations.
 *
 * Created by : Matthieu 'Raisenku' Arques <raisenku@sourcegem.com>
 */

import {expect} from 'chai';

import {StringRule, StringRuleError, RuleResult, ResultNodeOperator, ErrorResultNode} from '../../src';

describe('StringRule', function()
{
	it('fails validation when data given is not a string', function()
	{
		let rule = new StringRule();
		let result = new RuleResult(ResultNodeOperator.And, rule);

		rule.validate(true, result);

		expect(result.nodes.length).to.equal(1);
		expect(result.nodes[0]).to.be.instanceOf(ErrorResultNode);
		expect((<ErrorResultNode>result.nodes[0]).error.name).to.equal(StringRuleError.Type);

		result.clearNodes();
		rule.validate(null, result);

		expect(result.nodes.length).to.equal(1);
		expect(result.nodes[0]).to.be.instanceOf(ErrorResultNode);
		expect((<ErrorResultNode>result.nodes[0]).error.name).to.equal(StringRuleError.Null);

		result.clearNodes();
		rule.validate('this is a string', result);

		expect(result.nodes.length).to.equal(0);
	});

	it('can be configured to allow null value', function()
	{
		let rule = new StringRule({nullable: true});
		let result = new RuleResult(ResultNodeOperator.And, rule);

		rule.validate(null, result);
		expect(result.nodes.length).to.equal(0);
	});

	it('can be configured to have a minimum length value', function()
	{
		let rule = new StringRule({minLength: 3});
		let result = new RuleResult(ResultNodeOperator.And, rule);

		rule.validate('i', result);

		expect(result.nodes.length).to.equal(1);
		expect(result.nodes[0]).to.be.instanceOf(ErrorResultNode);
		expect((<ErrorResultNode>result.nodes[0]).error.name).to.equal(StringRuleError.MinLength);

		result.clearNodes();
		rule.validate('foo', result);

		expect(result.nodes.length).to.equal(0);
	});

	it('can be configured to have a maximum length value', function()
	{
		let rule = new StringRule({maxLength: 8});
		let result = new RuleResult(ResultNodeOperator.And, rule);

		rule.validate('this is a long string', result);

		expect(result.nodes.length).to.equal(1);
		expect(result.nodes[0]).to.be.instanceOf(ErrorResultNode);
		expect((<ErrorResultNode>result.nodes[0]).error.name).to.equal(StringRuleError.MaxLength);

		result.clearNodes();
		rule.validate('foo', result);

		expect(result.nodes.length).to.equal(0);
	});

	it('can be configured to test the given string with a RegExp', function()
	{
		let rule = new StringRule({regex: /^[a-zA-Z0-9\-]+$/});
		let result = new RuleResult(ResultNodeOperator.And, rule);

		rule.validate('$!*', result);

		expect(result.nodes.length).to.equal(1);
		expect(result.nodes[0]).to.be.instanceOf(ErrorResultNode);
		expect((<ErrorResultNode>result.nodes[0]).error.name).to.equal(StringRuleError.Regex);

		result.clearNodes();
		rule.validate('valid-slug', result);

		expect(result.nodes.length).to.equal(0);
	});

	it('can return multiple errors at once', function()
	{
		let rule = new StringRule({minLength: 3, maxLength: 32, regex: /^[a-zA-Z0-9\-]+$/});
		let result = new RuleResult(ResultNodeOperator.And, rule);

		rule.validate('$', result);

		expect(result.nodes.length).to.equal(2);
		expect(result.nodes[0]).to.be.instanceOf(ErrorResultNode);
		expect(result.nodes[1]).to.be.instanceOf(ErrorResultNode);
		expect((<ErrorResultNode>result.nodes[0]).error.name).to.equal(StringRuleError.MinLength);
		expect((<ErrorResultNode>result.nodes[1]).error.name).to.equal(StringRuleError.Regex);
	});
});