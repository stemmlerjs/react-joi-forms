
//@ts-ignore
import Joi from "joi-browser"

import { IForm } from './form-like'
import { IValidatorFormField } from './validator-form-field'
import { ICustomValidator } from './custom-validator'

export enum ValidatorType {
  JOI = 'joi',
  CUSTOM = 'custom'
}

export class Form implements IForm {
  public fields: IValidatorFormField[];
  private errorMap: any;

  constructor (fields: IValidatorFormField[]) {
    this.fields = fields;
    this.errorMap = {}
  }

  private setErrorMap (fieldName: string, errorMapOrValue: any) {
    if (typeof errorMapOrValue === "boolean") {
      this.errorMap[fieldName] = true;
    } else {
      // this.errorMap[fieldName] = createErrorStates(errorMapOrValue, true);
      this.errorMap[fieldName] = errorMapOrValue;
    }
  }

  private clearErrorMap () {
    this.errorMap = {};
  }

  private findField(formDataField: string) : IValidatorFormField {
    let foundField = null;
    this.fields.forEach((field) => {
      if (field.fieldName === formDataField) {
        foundField = field;
      }
    })

    if (foundField) return foundField;
    throw new Error(`Couldn't find field "${formDataField}" in the fields list`);
  }

  private validateFormFieldInternal (field: IValidatorFormField, value: string, formData?: any) : boolean {
    let isFieldValid;

    if (field.type === ValidatorType.JOI) {
      const result = Joi.validate(value, field.validator);
      if (result.error) {
        // console.warn('Form validation', field.fieldName, result.error)
        isFieldValid = false;
      } else {
        isFieldValid = true;
      }
    } else {
      const customValidator = (<ICustomValidator> field.validator);
      isFieldValid = customValidator.validate(value, formData);
    }

    if (!isFieldValid) {
      if (field.type === ValidatorType.CUSTOM && this.validatorHasCustomErrorMapResult(field)) {
        this.setErrorMap(field.fieldName, (<ICustomValidator>field.validator).getErrorsMap())
      } else {
        this.setErrorMap(field.fieldName, false)
      }
    }

    return isFieldValid;
  }

  private validatorHasCustomErrorMapResult (field: IValidatorFormField) {
    return (<ICustomValidator>field.validator).getErrorsMap;
  }

  getErrorMap () {
    return this.errorMap;
  }

  getErrorMapForField (fieldName: string) {
    return this.errorMap[fieldName]
  }

  validateForm (formData: any) : boolean {
    this.clearErrorMap();
    
    const formDataKeys = Object.keys(formData);
    
    for (let formDataField of formDataKeys) {
      let formDataValue: any = formData[formDataField];
      let field: IValidatorFormField = this.findField(formDataField);
      
      this.validateFormFieldInternal(field, formDataValue, formData);
    }

    return Object.keys(this.errorMap).length === 0;
  }

  validateFormField (field: string, value: any, formData?: any) : boolean {
    const formField = this.findField(field);
    return this.validateFormFieldInternal(formField, value, formData);
  }
}