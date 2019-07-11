/**
 * Copyright (c) SourceGem.
 * This code is licensed under the MIT License.
 * See the LICENSE file for more informations.
 *
 * Created by : Matthieu 'Aeres-Blade' Arques <aeresblade@sourcegem.com>
 */

import {ResultNode, ResultNodeOperator} from '.';
import {ResultError} from '..';

/**
 * A result node holding a validation error.
 */
export class ErrorResultNode extends ResultNode
{
	/**
	 * The validation error held by this node.
	 */
	public readonly error: ResultError;

	/**
	 * @param	operator	The logical operator of this node, relative to the last node in the list
	 * @param	error		The validation error held by this node
	 */
	public constructor(operator: ResultNodeOperator, error: ResultError)
	{
		super(operator);

		this.error = error;
	}
}