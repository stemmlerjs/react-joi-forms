
import { IValidatorFormField } from './validator-form-field'

export interface IForm {
  fields: IValidatorFormField[];
  validateForm (formData: any): boolean;
  validateFormField (field: string, value: any) : boolean;
}