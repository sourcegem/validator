/**
 * Copyright (c) SourceGem.
 * This code is licensed under the MIT License.
 * See the LICENSE file for more informations.
 *
 * Created by : Matthieu 'Raisenku' Arques <raisenku@sourcegem.com>
 */

import {ParenthesisResultNode, ResultNodeOperator} from '.';
import {Rule} from '../Rule';

/**
 * Serves as a validation error list for a specific Rule.
 */
export class RuleResult extends ParenthesisResultNode
{
	/**
	 * The Rule to which this result is bound to.
	 */
	public readonly rule: Rule;

	/**
	 * The identifier of this result, used to construct the error tree
	 */
	public readonly identifier?: string;

	/**
	 * @param	operator	The logical operator of this node, relative to the last node in the list
	 * @param	rule		The Rule to which this result is bound to
	 * @param	identifier 	The identifier of the new result, used to construct the error tree
	 */
	public constructor(operator: ResultNodeOperator, rule: Rule, identifier?: string)
	{
		super(operator);

		this.rule = rule;
		this.identifier = identifier;
	}

	/**
	 * Validates a sub rule.
	 * The validation errors of the rule are added to the current one.
	 * Used by rules with children rules like ObjectRule and ArrayRule.
	 *
	 * @param 	identifier	The identifier of the given rule, used to construct the error tree
	 * @param 	rule 		The Rule used for the validation
	 * @param 	data 		The data to be validated
	 * @return 				The newly created RuleResult used to validate the rule
	 */
	public andSub(identifier: string | undefined, rule: Rule, data: any): RuleResult
	{
		return this.sub(ResultNodeOperator.And, identifier, rule, data);
	}

	/**
	 * Validates a sub rule.
	 * The validation errors of the rule are added to the current one.
	 * Used by rules with children rules like ObjectRule and ArrayRule.
	 *
	 * @param 	identifier	The identifier of the given rule, used to construct the error tree
	 * @param 	rule 		The Rule used for the validation
	 * @param 	data 		The data to be validated
	 * @return 				The newly created RuleResult used to validate the rule
	 */
	public orSub(identifier: string | undefined, rule: Rule, data: any): RuleResult
	{
		return this.sub(ResultNodeOperator.And, identifier, rule, data);
	}

	/**
	 * Validates a sub rule.
	 * The validation errors of the rule are added to the current one.
	 * Used by rules with children rules like ObjectRule and ArrayRule.
	 *
	 * @param	operator	The logical operator of the new rule node, relative to the last node in the list
	 * @param 	identifier	The identifier of the given rule, used to construct the error tree
	 * @param 	rule 		The Rule used for the validation
	 * @param 	data 		The data to be validated
	 * @return 				The newly created RuleResult used to validate the rule
	 */
	public sub(operator: ResultNodeOperator, identifier: string | undefined, rule: Rule, data: any): RuleResult
	{
		let result = new RuleResult(operator, rule, identifier);
		rule.validate(data, result);

		if(result.nodes.length > 0)
			this._nodes.push(result);

		return result;
	}
}