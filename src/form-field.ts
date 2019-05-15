
import { IValidatorFormField } from './validator-form-field'
import { ICustomValidator } from './custom-validator'
import { ValidatorType } from './form'

export class FormField implements IValidatorFormField {
  public fieldName: string;
  public validator: Function | ICustomValidator;
  public type: ValidatorType;

  constructor (fieldName: string, validator: Function | ICustomValidator, type: ValidatorType) {
    if (!fieldName) throw new Error('Need to provide a field name for validator field')
    if (!validator) throw new Error('Must supply a validator function')
    if (!type) throw new Error('Must specify the validator type');

    this.fieldName = fieldName;
    this.validator = validator;
    this.type = type;
  }
}