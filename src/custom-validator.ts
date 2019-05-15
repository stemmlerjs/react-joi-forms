export interface ICustomValidator {
  validate (data: any, entireFormData?: any) : boolean;
  getErrorsMap? () : any;
}