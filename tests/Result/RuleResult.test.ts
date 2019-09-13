/**
 * Copyright (c) SourceGem.
 * This code is licensed under the MIT License.
 * See the LICENSE file for more informations.
 *
 * Created by : Matthieu 'Raisenku' Arques <raisenku@sourcegem.com>
 */

import {expect} from 'chai';

import {RuleResult, ResultNodeOperator, ErrorResultNode, BooleanRule, BooleanRuleError} from '../../src';

describe('RuleResult', function()
{
	it('can validate sub rules', function()
	{
		let result = new RuleResult(ResultNodeOperator.And, new BooleanRule());
		result.sub(ResultNodeOperator.And, 'foo', new BooleanRule(), 'this is not a boolean');

		expect(result.nodes.length).to.equal(1);
		expect(result.nodes[0]).to.be.instanceOf(RuleResult);
		expect((<RuleResult>result.nodes[0]).identifier).to.equal('foo');
		expect((<RuleResult>result.nodes[0]).nodes.length).to.equal(1);
		expect((<RuleResult>result.nodes[0]).nodes[0]).to.be.instanceOf(ErrorResultNode);
		expect((<ErrorResultNode>(<RuleResult>result.nodes[0]).nodes[0]).error.name).to.equal(BooleanRuleError.Type);
	});
});