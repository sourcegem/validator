/**
 * Copyright (c) SourceGem.
 * This code is licensed under the MIT License.
 * See the LICENSE file for more informations.
 *
 * Created by : Matthieu 'Aeres-Blade' Arques <aeresblade@sourcegem.com>
 */

import {Rule} from '.';
import {RuleResult} from '../Result';

/**
 * A Rule that takes multiple other rules and which validation succeed if at least one of its subrules validates the data.
 */
export class OrRule implements Rule
{
	/**
	 * The rules that will be used to validate the data.
	 */
	private readonly rules: Array<Rule> = [];

	/**
	 * @param 	rules 	The rules that will be used to validate the data
	 */
	public constructor(...rules: Array<Rule | Array<Rule>>)
	{
		for(let rule of rules)
		{
			if(rule instanceof Array)
				this.rules = this.rules.concat(<Array<Rule>>rule);
			else
				this.rules.push(<Rule>rule);
		}
	}

	/**
	 * Validates a data element.
	 *
	 * @param 	data 		The data element to validate
	 * @param	result		The RuleResult used to set validation errors
	 * @return 				void
	 */
	public validate(data: any, result: RuleResult): void
	{
		for(let rule of this.rules)
			result.orSub(undefined, rule, data);
	}
}