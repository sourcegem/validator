/**
 * Copyright (c) SourceGem.
 * This code is licensed under the MIT License.
 * See the LICENSE file for more informations.
 *
 * Created by : Matthieu 'Aeres-Blade' Arques <aeresblade@sourcegem.com>
 */

import {expect} from 'chai';

import {ErrorResultNode, ParenthesisResultNode, ResultNodeOperator} from '../../../src';

describe('ParenthesisResultNode', function()
{
	it('can store ResultErrors with their logical operator', function()
	{
		let node = new ParenthesisResultNode(ResultNodeOperator.And);
		node.and({name: 'foo', value: null, data: {}});
		node.or({name: 'bar', value: null, data: {}});
		node.error(ResultNodeOperator.Or, {name: 'gem', value: null, data: {}});

		expect(node.nodes.length).to.equal(3);

		expect(node.nodes[0].operator).to.equal(ResultNodeOperator.And);
		expect(node.nodes[1].operator).to.equal(ResultNodeOperator.Or);
		expect(node.nodes[2].operator).to.equal(ResultNodeOperator.Or);

		expect(node.nodes[0]).to.be.instanceOf(ErrorResultNode);
		expect(node.nodes[1]).to.be.instanceOf(ErrorResultNode);
		expect(node.nodes[2]).to.be.instanceOf(ErrorResultNode);

		expect((<ErrorResultNode>(node.nodes[0])).error.name).to.equal('foo');
		expect((<ErrorResultNode>(node.nodes[1])).error.name).to.equal('bar');
		expect((<ErrorResultNode>(node.nodes[2])).error.name).to.equal('gem');
	});

	it('can create a sub ParenthesisResultNode when passing a callback to its error methods', function()
	{
		let node = new ParenthesisResultNode(ResultNodeOperator.And);

		node.and(function(node)
		{
			node.or({name: 'foo', value: null, data: {}});
			node.or({name: 'bar', value: null, data: {}});
		});

		expect(node.nodes.length).to.equal(1);
		expect(node.nodes[0]).to.be.instanceOf(ParenthesisResultNode);

		node = <ParenthesisResultNode>node.nodes[0];

		expect(node.nodes.length).to.equal(2);

		expect(node.nodes[0].operator).to.equal(ResultNodeOperator.Or);
		expect(node.nodes[1].operator).to.equal(ResultNodeOperator.Or);

		expect(node.nodes[0]).to.be.instanceOf(ErrorResultNode);
		expect(node.nodes[1]).to.be.instanceOf(ErrorResultNode);

		expect((<ErrorResultNode>(node.nodes[0])).error.name).to.equal('foo');
		expect((<ErrorResultNode>(node.nodes[1])).error.name).to.equal('bar');
	});

	it('can clear its node list', function()
	{
		let node = new ParenthesisResultNode(ResultNodeOperator.And);
		node.and({name: 'foo', value: null, data: {}});
		node.clearNodes();

		expect(node.nodes.length).to.equal(0);
	});
});