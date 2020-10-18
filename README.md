Generic Form project.

## Demo
A sample case is set within the main app component, using a text field as in the requirement.

### Default create-react-app Scripts
* `yarn start`
* `yarn test`

## Form
The form is located under the components folder and includes:
* Unit test for each task request
* Interfaces
  
It's possible to generate your input string form by defining the input properties in a dictionary format, allowing JSON injection which comply with the following model:
```typescript
interface FormInputs {
  name: string;                       // Name for the input, used to retrieve data and bind label
  value?: string;                     // Initial value for the input
  label?: string;                     // Label value
  placeholder?: string;               // Placeholder value
  validations?: FormValidation[];     // Set validation rulesets and related errors
}
```
The list of input is set in a dictionary format, to avoid possible values duplication.

On form submission it will:
* Validate all the inputs
* Return the Form state
* Errors will then be displayed under the inputs based on the state

Each input contains then a change handler, to flag the form as changed as well.

## Process
The form has been build as follow:
1. Created an initial Form component
2. Defined interfaces for the props to be passed and generate the inputs
3. Defined states for the Form using hooks, to keep track of the functionalities
4. Added handlers to manage the functionalities
5. Added data to the parent App component to be passed as prop
6. Defined markup within the Form component
7.  Written unit tests assertions, to ensure the requirements
8.  Completed the logic
9.  Added final styles
10. This documentation :)