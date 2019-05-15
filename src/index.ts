
//@ts-ignore
// import Joi from "joi-browser"
// import { Form, ValidatorType } from './form'

export * from './custom-validator'
export * from './form-field'
export * from './form-like'
export * from './form'
export * from './validator-form-field'

// debugger
// let form = new Form([
//   { fieldName: 'jobTitle', validator: Joi.string().min(2).max(60).required(), type: ValidatorType.JOI },
//   { fieldName: 'isPayingJob', validator: Joi.bool().required(), type: ValidatorType.JOI }
// ])

// form.validateForm({ jobTitle: 'First Posting', isPayingJob: false })