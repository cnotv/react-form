interface FormValidation {
  validate: (val: string) => boolean;
  message: string;
}

interface FormState {
  changed: boolean;
  errors: Dictionary<string[]>;
  valid: boolean;
  values: Dictionary<string>; // We said to use string only
}

interface FormInputs {
  name: string;
  value?: string;
  label?: string;
  placeholder?: string;
  validations?: FormValidation[];
}