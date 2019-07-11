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
 * Options interface passed to the StringRule.
 */
export interface StringRuleOptions
{
	/**
	 * Wether the data can be null / undefined or not (default false).
	 */
	nullable?: boolean;

	/**
	 * The minimum length of the string (default none).
	 */
	minLength?: number;

	/**
	 * The maximum length of the string (default none).
	 */
	maxLength?: number;

	/**
	 * A RegExp used to validate the string (default none).
	 */
	regex?: RegExp;
}

/**
 * The different error identifiers of the StringRule.
 */
export enum StringRuleError
{
	/**
	 * Thrown when the tested value is null or undefined and the nullable option is set to false.
	 */
	Null		= 'string.null',

	/**
	 * Thrown when the tested value is not a string.
	 */
	Type		= 'string.type',

	/**
	 * Thrown when the minLength option is set and the tested string is shorter than the option value.
	 * Additional data passed with the error:
	 *   - minLength : The option value for the minimum length of the string
	 *   - actualLength : The actual length of the tested value
	 */
	MinLength	= 'string.min_length',

	/**
	 * Thrown when the maxLength option is set and the tested string is longer than the option value.
	 * Additional data passed with the error:
	 *   - maxLength : The option value for the maximum length of the string
	 *   - actualLength : The actual length of the tested value
	 */
	MaxLength	= 'string.max_length',

	/**
	 * Thrown when the regex option is set and the tested string doesn't match it.
	 * Additional data passed with the error:
	 *   - regex : The regular expression which the tested string must match
	 */
	Regex		= 'string.regex'
}

/**
 * A Rule that validates a string value.
 */
export class StringRule implements Rule
{
	/**
	 * The options of the StringRule.
	 */
	public readonly options: StringRuleOptions;

	/**
	 * @param 	options 	The options of the StringRule
	 */
	public constructor(options: StringRuleOptions = {})
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
			return void(this.options.nullable ? undefined : result.and({error: StringRuleError.Null, value: data, data: {}}));

		if(typeof data !== 'string')
			return void result.and({error: StringRuleError.Type, value: data, data: {}});

		if(this.options.minLength !== undefined && data.length < this.options.minLength)
			result.and({error: StringRuleError.MinLength, value: data, data: {minLength: this.options.minLength, actualLength: data.length}});
		else if(this.options.maxLength !== undefined && data.length > this.options.maxLength)
			result.and({error: StringRuleError.MaxLength, value: data, data: {maxLength: this.options.maxLength, actualLength: data.length}});

		if(this.options.regex !== undefined && !this.options.regex.test(data))
			result.and({error: StringRuleError.Regex, value: data, data: {regex: this.options.regex}});
	}
}