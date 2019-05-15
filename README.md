# Form Validation

>> A way to do clean form validation and validate an entire model or attributes on that model!

## Creating a new form!

You can create a new form by using the Form class like this:

```typescript
let form = new Form([
  { fieldName: 'jobTitle', validator: Joi.string().min(2).max(60).required(), type: ValidatorType.JOI },
  { fieldName: 'isPayingJob', validator: Joi.bool().required(), type: ValidatorType.JOI },
  { fieldName: 'paidJobDetails', validator: paidJobDetailsValidator, type: ValidatorType.CUSTOM },
])
```

A form takes in an array of ```Field``` objects like so!

## Usage

+ Form
  + validateForm (formData: any) : boolean
  + validateFormField (field: string, value: any) : boolean

These are the two most important methods on the form class. With this, we can validate the entire form, 
or we can just validate a specific form field.

### Validator Types

We have two types of validators.

1. JOI validator
2. Custom validator

#### Joi Validator

To validate a field using the Joi Validator, create a Joi validation chain on the ```validator``` key for the field.

#### Custom Validator

We can also create our own custom validator. Custom validators need to implement the ```ICustomValidator``` interface.# react-joi-forms
