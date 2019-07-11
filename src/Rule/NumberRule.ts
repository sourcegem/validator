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
 * Options interface passed to the NumberRule.
 */
export interface NumberRuleOptions
{
	/**
	 * Wether the data can be null / undefined or not (default false).
	 */
	nullable?: boolean;

	/**
	 * Wether the number can be floating or not (default false).
	 */
	floating?: boolean;

	/**
	 * The minimum value of the number (default none).
	 */
	min?: number;

	/**
	 * The maximum value of the number (default none).
	 */
	max?: number;
}

/**
 * The different error identifiers of the NumberRule.
 */
export enum NumberRuleError
{
	/**
	 * Thrown when the tested value is null or undefined and the nullable option is set to false.
	 */
	Null		= 'number.null',

	/**
	 * Thrown when the tested value is not a number.
	 */
	Type		= 'number.type',

	/**
	 * Thrown when the tested number is not a floating number and the floating option is set to false.
	 */
	Float		= 'number.float',

	/**
	 * Thrown when the min option is set and the tested number is less than the option value.
	 * Additional data passed with the error:
	 *   - min : The option value for the minimum value of the number
	 */
	Min			= 'number.min',

	/**
	 * Thrown when the max option is set and the tested number is greater than the option value.
	 * Additional data passed with the error:
	 *   - max : The option value for the maximum value of the number
	 */
	Max			= 'number.max'
}

/**
 * A Rule that validates a number value.
 */
export class NumberRule implements Rule
{
	/**
	 * The options of the NumberRule.
	 */
	public readonly options: NumberRuleOptions;

	/**
	 * @param 	options 	The options of the NumberRule
	 */
	public constructor(options: NumberRuleOptions = {})
	{
		this.options = Object.assign({
			nullable: false,
			floating: false
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
			return void(this.options.nullable ? undefined : result.and({error: NumberRuleError.Null, value: data, data: {}}));

		if(typeof data !== 'number')
			return void result.and({error: NumberRuleError.Type, value: data, data: {}});

		if(!this.options.floating && (data % 1 !== 0))
			result.and({error: NumberRuleError.Float, value: data, data: {}})

		if(this.options.min !== undefined && data < this.options.min)
			result.and({error: NumberRuleError.Min, value: data, data: {min: this.options.min}});
		else if(this.options.max !== undefined && data > this.options.max)
			result.and({error: NumberRuleError.Max, value: data, data: {max: this.options.max}});
	}
}