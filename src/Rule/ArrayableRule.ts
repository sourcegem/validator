/**
 * Copyright (c) SourceGem.
 * This code is licensed under the MIT License.
 * See the LICENSE file for more informations.
 *
 * Created by : Matthieu 'Aeres-Blade' Arques <aeresblade@sourcegem.com>
 */

import {Rule, OrRule, ArrayRule, ArrayRuleOptions} from '.';

/**
 * A rule that allows the data being validated to match the subrule or to be an array of elements that match the subrule.
 */
export class ArrayableRule extends OrRule
{
	/**
	 * @param 	subRule 		The subrule used for validation
	 * @param 	arrayOptions 	The options of the ArrayRule
	 */
	public constructor(subRule: Rule, arrayOptions: ArrayRuleOptions = {})
	{
		super(subRule, new ArrayRule(subRule, arrayOptions));
	}
}