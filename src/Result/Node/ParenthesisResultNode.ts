/**
 * Copyright (c) SourceGem.
 * This code is licensed under the MIT License.
 * See the LICENSE file for more informations.
 *
 * Created by : Matthieu 'Aeres-Blade' Arques <aeresblade@sourcegem.com>
 */

import {ResultNode, ResultNodeOperator, ErrorResultNode} from '.';
import {ResultError} from '..';

/**
 * A result node that serves as a parenthesis wrapper for inner nodes, to create more complex validation errors.
 */
export class ParenthesisResultNode extends ResultNode
{
	/**
	 * The inner nodes of this parenthesis node.
	 */
	protected _nodes: Array<ResultNode> = [];

	/**
	 * Adds an error to the list of validation errors.
	 *
	 * @param 	errorOrCallback		The ResultError to add, or a callback function to add multiple errors inside a parenthesis node
	 * @return						This ParenthesisResultNode
	 */
	public and(errorOrCallback: ResultError | ((node: ParenthesisResultNode) => void)): this
	{
		this.createNode(ResultNodeOperator.And, errorOrCallback);

		return this;
	}

	/**
	 * Adds an error to the list of validation errors.
	 *
	 * @param 	errorOrCallback		The ResultError to add, or a callback function to add multiple errors inside a parenthesis node
	 * @return						This ParenthesisResultNode
	 */
	public or(errorOrCallback: ResultError | ((node: ParenthesisResultNode) => void)): this
	{
		this.createNode(ResultNodeOperator.Or, errorOrCallback);

		return this;
	}

	/**
	 * Adds an error to the list of validation errors.
	 *
	 * @param 	operator			The logical operator between this error and the last one
	 * @param 	errorOrCallback		The ResultError to add, or a callback function to add multiple errors inside a parenthesis node
	 * @return						This ParenthesisResultNode
	 */
	public error(operator: ResultNodeOperator, errorOrCallback: ResultError | ((node: ParenthesisResultNode) => void)): this
	{
		this.createNode(operator, errorOrCallback);

		return this;
	}

	/**
	 * Clears the inner list of nodes.
	 *
	 * @return						This ParenthesisResultNode
	 */
	public clearNodes(): this
	{
		this._nodes = [];

		return this;
	}

	/**
	 * Gets the inner nodes of this ParenthesisResultNode.
	 *
	 * @return 						The inner nodes of this parenthesis node
	 */
	public get nodes(): Array<ResultNode>
	{
		return this._nodes;
	}

	/**
	 * Creates an inner node depending on the type of errorOrCallback.
	 *
	 * @param 	operator			The logical operator of the created node
	 * @param 	errorOrCallback		The ResultError to add, or a callback function to add multiple errors inside a parenthesis node
	 * @return						void
	 */
	private createNode(operator: ResultNodeOperator, errorOrCallback: ResultError | ((node: ParenthesisResultNode) => void)): void
	{
		if(typeof errorOrCallback === 'function')
		{
			let subNode = new ParenthesisResultNode(operator);
			this._nodes.push(subNode);

			errorOrCallback.call(subNode, subNode);
		}
		else
		{
			this._nodes.push(new ErrorResultNode(operator, errorOrCallback));
		}
	}
}