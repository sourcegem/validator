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
 * A set of object element options.
 */
export interface ObjectElementOptions
{
	/**
	 * Wether the object element is optional or not (default false).
	 */
	optional?: boolean;
}

/**
 * Defines the structure of the object.
 * A Rule or a set of Rule + IObjectElementOptions must be assigned to each key.
 */
export interface ObjectRuleStructure
{
	[key: string]: Rule | {rule: Rule, options?: ObjectElementOptions};
}

/**
 * The different error identifiers of the ObjectRule.
 */
export enum ObjectRuleError
{
	/**
	 * Thrown when the tested value is not an object.
	 */
	Type			= 'object.type',

	/**
	 * Thrown when the tested object is missing an element and this element is not marked as optional in the structure
	 * Additional data passed with the error:
	 *   - key : The key of the missing element
	 */
	MissingElement	= 'object.missing_element'
}

/**
 * A Rule that validates an object.
 */
export class ObjectRule implements Rule
{
	/**
	 * The structure of the object.
	 */
	private readonly structure: ObjectRuleStructure;

	/**
	 * @param	structure 	The structure of the object
	 */
	public constructor(structure: ObjectRuleStructure)
	{
		this.structure = structure;

		for(var key in this.structure)
		{
			if((<Rule>this.structure[key]).validate)
				this.structure[key] = {rule: <Rule>this.structure[key], options: {optional: false}};
			else
			{
				(<{rule: Rule, options: ObjectElementOptions}>this.structure[key]).options = Object.assign({
					optional: false
				}, (<{rule: Rule, options: ObjectElementOptions}>this.structure[key]).options);
			}
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
		if(typeof data !== 'object')
			return void result.and({error: ObjectRuleError.Type, value: data, data: {}});

		for(var k of Object.keys(this.structure))
		{
			let element = <{rule: Rule, options: ObjectElementOptions}>this.structure[k];

			if(typeof data[k] === 'undefined')
			{
				if(!element.options.optional)
					result.and({error: ObjectRuleError.MissingElement, value: data, data: {key: k}})

				continue;
			}

			result.andSub(k, element.rule, data[k]);
		}
	}
}