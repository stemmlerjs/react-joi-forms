
//@ts-ignore
import Joi from 'joi-browser'
import { Form, ValidatorType } from './form'

let form = new Form([]);

// Disable logging for a moment
let errorLogger = window.console.error;
window.console.error = () => { }

test('Form class can load fields into it', () => {
  form = new Form([
    { fieldName: 'jobTitle', validator: Joi.string().min(2).max(60).required(), type: ValidatorType.JOI },
    { fieldName: 'isPayingJob', validator: Joi.bool().required(), type: ValidatorType.JOI }
  ])

  expect(form.fields.length).toEqual(2)
})

test('Form => validateForm() returns false when the form is invalid', () => {
  form = new Form([
    { fieldName: 'jobTitle', validator: Joi.string().min(2).max(60).required(), type: ValidatorType.JOI },
    { fieldName: 'isPayingJob', validator: Joi.bool().required(), type: ValidatorType.JOI }
  ])

  expect(form.validateForm({ jobTitle: 'F', isPayingJob: false })).toBe(false);
})

test('Form => validateForm() returns true when the form is valid', () => {
  form = new Form([
    { fieldName: 'jobTitle', validator: Joi.string().min(2).max(60).required(), type: ValidatorType.JOI },
    { fieldName: 'isPayingJob', validator: Joi.bool().required(), type: ValidatorType.JOI }
  ])

  expect(form.validateForm({ jobTitle: 'Fully Ready For This To Pass', isPayingJob: false })).toBe(true);
})

test('Form => validateFormField() returns false if a specific field is invalid', () => {
  form = new Form([
    { fieldName: 'jobTitle', validator: Joi.string().min(2).max(60).required(), type: ValidatorType.JOI },
    { fieldName: 'isPayingJob', validator: Joi.bool().required(), type: ValidatorType.JOI }
  ])
  expect(form.validateFormField('jobTitle', 'e')).toBe(false);
})

test('Form => validateFormField() returns true when the field we want to validate is valid', () => {
  form = new Form([
    { fieldName: 'jobTitle', validator: Joi.string().min(2).max(60).required(), type: ValidatorType.JOI },
    { fieldName: 'isPayingJob', validator: Joi.bool().required(), type: ValidatorType.JOI }
  ])
  expect(form.validateFormField('jobTitle', 'Valid Job Title')).toBe(true);
})

test('Form => validateFormField() throws an error if we try to validate a field that doesnt exist', () => {
  form = new Form([
    { fieldName: 'jobTitle', validator: Joi.string().min(2).max(60).required(), type: ValidatorType.JOI },
    { fieldName: 'isPayingJob', validator: Joi.bool().required(), type: ValidatorType.JOI }
  ])

  let errorThrown = false;
  try {
    form.validateFormField('janky', 9)
  } catch (err) {
    errorThrown = true;
  }
  expect(errorThrown).toBe(true)
})

test('Form => validateFormField() will allow us to validate fields with custom validators', () => {
  let customValidator = { 
    validate: (value: any) => {
      if (value === "Worst job ever") {
        return true;
      } else {
        return false;
      }
    } 
  }

  form = new Form([
    { fieldName: 'jobTitle', validator: customValidator, type: ValidatorType.CUSTOM },
    { fieldName: 'isPayingJob', validator: Joi.bool().required(), type: ValidatorType.JOI }
  ])

  expect(form.validateFormField('jobTitle', "Worst job ever")).toBe(true)
  expect(form.validateFormField('jobTitle', "Some other job")).toBe(false)
})



// Turn logging back on
// window.console.error = errorLogger;