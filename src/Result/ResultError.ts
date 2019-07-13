/**
 * Copyright (c) SourceGem.
 * This code is licensed under the MIT License.
 * See the LICENSE file for more informations.
 *
 * Created by : Matthieu 'Aeres-Blade' Arques <aeresblade@sourcegem.com>
 */

/**
 * Describes an error added to a RuleResult by a Rule.
 */
export interface ResultError
{
	/**
	 * An identifier string specific to the error.
	 */
	name	: string;

	/**
	 * The faulty data value.
	 */
	value	: any;

	/**
	 * Custom data specific to the error.
	 */
	data	: {[key: string]: any};
}