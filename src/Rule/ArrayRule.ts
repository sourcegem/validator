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
 * Options interface passed to the ArrayRule.
 */
export interface ArrayRuleOptions
{
	/**
	 * The minimum size of the array (default none).
	 */
	minSize?: number;

	/**
	 * The maximum size of the array (default none).
	 */
	maxSize?: number;
}

/**
 * The different error identifiers of the ArrayRule.
 */
export enum ArrayRuleError
{
	/**
	 * Thrown when the tested value is not an array.
	 */
	Type		= 'array.type',

	/**
	 * Thrown when the minSize option is set and the tested array length is less than the option value.
	 * Additional data passed with the error:
	 *   - minSize : The option value for the minimum size of the array
	 *   - actualSize : The actual size of the tested array
	 */
	MinSize		= 'array.min_size',

	/**
	 * Thrown when the maxSize option is set and the tested array length is greater than the option value.
	 * Additional data passed with the error:
	 *   - maxSize : The option value for the maximum size of the array
	 *   - actualSize : The actual length of the tested array
	 */
	MaxSize		= 'array.max_size'
}

/**
 * A Rule that validates an array.
 */
export class ArrayRule implements Rule
{
	/**
	 * The sub rule used to validate array elements.
	 */
	private readonly subRule: Rule;

	/**
	 * The options of the ArrayRule.
	 */
	private readonly options: ArrayRuleOptions;

	/**
	 * @param 	subRule 	The sub rule used to validate array elements
	 * @param 	options 	The options of the ArrayRule
	 */
	public constructor(subRule: Rule, options: ArrayRuleOptions = {})
	{
		this.subRule = subRule;
		this.options = options;
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
		if(!(data instanceof Array))
			return void result.and({name: ArrayRuleError.Type, value: data, data: {}});

		if(this.options.minSize !== undefined && data.length < this.options.minSize)
			result.and({name: ArrayRuleError.MinSize, value: data, data: {minSize: this.options.minSize, actualSize: data.length}});
		else if(this.options.maxSize !== undefined && data.length > this.options.maxSize)
			result.and({name: ArrayRuleError.MaxSize, value: data, data: {maxSize: this.options.maxSize, actualSize: data.length}});

		for(var i in data)
			result.andSub(i.toString(), this.subRule, data[i]);
	}
}