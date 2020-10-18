import React, { FormEvent, useState } from 'react';
import { inputsToValues } from '../helpers/form.helper';
import './Form.css';

interface FormProps {
  inputs: Dictionary<FormInputs>,
  onSubmit?: (val: Dictionary<string>) => void
}

export default function Form(props: FormProps) {
  const [changed, setChanged] = useState<boolean>(false);
  const [errors, setErrors] = useState<Dictionary<string[]>>({});
  const [valid, setValid] = useState<boolean>(true);
  const [values, setValues] = useState<Dictionary<string>>(inputsToValues(props.inputs));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    validate();
    if (props.onSubmit) {
      props.onSubmit(values);
    }

    return {
      changed,
      errors,
      valid,
      values
    }
  }

  /**
   * Submit new value to the state.
   * In this case we use strings only.
   */
  function handleChange(name: string, value: string) {
    setChanged(true);
    setValues({ ...values, [name]: value });
  }

  /**
   * Return list of errors for each validation of the input
   * @param input 
   */
  const getErrors = (input: FormInputs) => input.validations ?
    input.validations
      .filter(validation => !validation.validate(values[input.name]))
      .map(({ message }) => message)
    : [];

  /**
   * Validate all the inputs
   */
  function validate() {
    const errorsMsgs = Object.values(props.inputs).reduce((acc, input) => {
      const msgs = getErrors(input);
      if (msgs.length) {
        Object.assign(acc, { [input.name]: msgs })
      }
      return acc;
    }, {});

    setErrors(errorsMsgs)
    setValid(!Object.keys(errorsMsgs).length)
  };

  return (
    <form
      className="form"
      onSubmit={e => handleSubmit(e)}
    >
      {Object.values(props.inputs).map((input, i) => (
        <div
          key={i}
          className="form__item"
        >
          {input.label ?
            <label
              className="form__item__label"
              htmlFor={input.name}
            >{input.label}</label>
            : ''}

          <input
            className="form__item__input"
            type="text"
            placeholder={input.placeholder}
            value={values[input.name] || ''}
            name={input.name}
            onChange={e => handleChange(input.name, e.target.value)}
          />

          {errors[input.name]
            ? errors[input.name].map((error, i) => (
              <p
                className="form__errors"
                key={i}
              >{error}</p>
            ))
            : ''
          }
        </div>


      ))}

      <button
        className="form__button"
        type="submit"
      >Submit</button>
    </form>
  )
}
