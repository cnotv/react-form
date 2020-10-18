/**
 * Return a dictionary of values based on input name
 * @param formInputs 
 */
export function inputsToValues(formInputs: Dictionary<FormInputs>): Dictionary<string> {
  return Object.values(formInputs)
    .filter(input => !!input.value)
    .reduce((acc, input) => {
      return {...acc, [input.name]: input.value}
    }, {})
}