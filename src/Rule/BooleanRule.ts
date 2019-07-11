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
 * Options interface passed to the BooleanRule.
 */
export interface BooleanRuleOptions
{
	/**
	 * Wether the data can be null or not (default false).
	 */
	nullable?: boolean;
}

/**
 * The different error identifiers of the BooleanRule.
 */
export enum BooleanRuleError
{
	/**
	 * Thrown when the tested value is null or undefined and the nullable option is set to false.
	 */
	Null		= 'boolean.null',

	/**
	 * Thrown when the tested value is not a boolean.
	 */
	Type		= 'boolean.type'
}

/**
 * A Rule that validates a boolean value.
 */
export class BooleanRule implements Rule
{
	/**
	 * The options of the BooleanRule.
	 */
	public readonly options: BooleanRuleOptions;

	/**
	 * @param 	options 	The options of the BooleanRule
	 */
	public constructor(options: BooleanRuleOptions = {})
	{
		this.options = Object.assign({
			nullable: false
		}, options);
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
		if(data === null || data === undefined)
			return void(this.options.nullable ? undefined : result.and({error: BooleanRuleError.Null, value: data, data: {}}));

		if(typeof data !== 'boolean')
			return void result.and({error: BooleanRuleError.Type, value: data, data: {}});
	}
}