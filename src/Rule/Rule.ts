/**
 * Copyright (c) SourceGem.
 * This code is licensed under the MIT License.
 * See the LICENSE file for more informations.
 *
 * Created by : Matthieu 'Raisenku' Arques <raisenku@sourcegem.com>
 */

import {RuleResult} from '../Result';

/**
 * The interface used for all validation rules.
 * Custom validation rules can be created by implementing this interface.
 */
export interface Rule
{
	/**
	 * Validates a data element.
	 *
	 * @param 	data 		The data element to validate
	 * @param	result		The RuleResult used to set validation errors
	 * @return 				void
	 */
	validate(data: any, result: RuleResult): void;
}