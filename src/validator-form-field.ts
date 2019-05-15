
import { ICustomValidator } from './custom-validator'
import { ValidatorType } from './form'

export interface IValidatorFormField {
  fieldName: string;
  validator: Function | ICustomValidator;
  type: ValidatorType;
}