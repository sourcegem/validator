/**
 * Copyright (c) SourceGem.
 * This code is licensed under the MIT License.
 * See the LICENSE file for more informations.
 *
 * Created by : Matthieu 'Aeres-Blade' Arques <aeresblade@sourcegem.com>
 */

/**
 * The logical operators available when adding result errors to a RuleResult
 */
export enum ResultNodeOperator
{
	And,
	Or
}

/**
 * Base class for the different types of result nodes available.
 */
export abstract class ResultNode
{
	/**
	 * The logical operator of this node, relative to the last node in the list.
	 */
	public readonly operator: ResultNodeOperator;

	/**
	 * @param	operator	The logical operator of this node, relative to the last node in the list
	 */
	public constructor(operator: ResultNodeOperator)
	{
		this.operator = operator;
	}
}