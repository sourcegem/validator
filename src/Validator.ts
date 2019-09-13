/**
 * Copyright (c) SourceGem.
 * This code is licensed under the MIT License.
 * See the LICENSE file for more informations.
 *
 * Created by : Matthieu 'Raisenku' Arques <raisenku@sourcegem.com>
 */

import {Rule, RuleResult, ResultNodeOperator} from '.';

/**
 * The main Validator class.
 */
export class Validator
{
	/**
	 * The root validation rule.
	 */
	private readonly rule: Rule;

	/**
	 * @param	rule 	The root validation rule
	 */
	public constructor(rule: Rule)
	{
		this.rule = rule;
	}

	/**
	 * Validates the data using the rule passed to the constructor of the Validator.
	 *
	 * @param 	data 	The data to validate
	 * @return			The resulting RuleResult
	 */
	public validate(data: any): RuleResult
	{
		let result = new RuleResult(ResultNodeOperator.And, this.rule);
		this.rule.validate(data, result);

		return result;
	}
}