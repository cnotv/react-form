import React from 'react';
import { shallow } from 'enzyme';
import Form from './Form';
import { render, fireEvent } from '@testing-library/react';

describe('Form component should', () => {
  test('create an input', () => {
    const inputs: Dictionary<FormInputs> = {
      name: {
        name: 'name',
      }
    };
    const wrapper = shallow(<Form inputs={inputs} />);

    const input = wrapper.find('input').getElement();

    expect(input).toBeTruthy();
  })

  test('set initial values', () => {
    const value = 'initial value';
    const inputs: Dictionary<FormInputs> = {
      name: {
        name: 'name',
        value
      }
    };
    const wrapper = shallow(<Form inputs={inputs} />);

    const inputValue = wrapper.find('input').getElement().props.value;

    expect(inputValue).toBe(value)
  })

  test('submit the form', () => {
    const name = 'name';
    const value = 'test';
    const inputs = { name: { name, value } };
    const expectation = { [name]: value };
    let result = {};
    const wrapper = render(<Form inputs={inputs} onSubmit={val => (result = val)} />);

    fireEvent.click(wrapper.getByText(/Submit/i));

    expect(expectation).toStrictEqual(result)
  })

  test('display errors', () => {
    const message = 'this is an error';
    const inputs: Dictionary<FormInputs> = {
      name: {
        name: 'name',
        validations: [{
          validate: () => false,
          message
        }]
      }
    };
    const wrapper = render(<Form inputs={inputs} />);

    fireEvent.click(wrapper.getByText(/Submit/i));

    const linkElement = wrapper.getByText(/this is an error/i);
    expect(linkElement).toBeInTheDocument();
  })

  // Enzyme has issues to test states without use classes in React
  xdescribe('return state', () => {
    test('invalid', () => {
      const message = 'this is an error';
      const inputs: Dictionary<FormInputs> = {
        name: {
          name: 'name',
          validations: [{
            validate: () => false,
            message
          }]
        }
      };
      const wrapper = shallow(<Form inputs={inputs} />);
      const form = wrapper.instance();

      form.validate();

      expect(wrapper.state('valid')).toEqual(false);
    })

    test('with errors', () => {
      const regex = /^wooga.name/g;
      const message = 'Please prefix the name with "wooga.name"';
      const validation: FormValidation = {
        validate: str => regex.test(str),
        message
      }
      const inputs: Dictionary<FormInputs> = {
        name: {
          name: 'name',
          validations: [validation]
        }
      };
      const wrapper = shallow(<Form inputs={inputs} />);
      const form = wrapper.instance();

      form.validate();

      expect(wrapper.state('errors')).toBe([message]);
    })

    test('changed', () => {
      const inputs: Dictionary<FormInputs> = {
        name: {
          name: 'name',
        }
      };
      const wrapper = shallow(<Form inputs={inputs} />);
      const form = wrapper.instance();

      form.handleChange('name', 'you are now changed!')

      expect(wrapper.state('changed')).toEqual(true);
    })

    test('with new values', () => {
      const name = 'My name';
      const inputs: Dictionary<FormInputs> = {
        name: {
          name: 'name',
        }
      };
      const wrapper = shallow(<Form inputs={inputs} />);
      const form = wrapper.instance();

      // form.handleChange('name', name)

      const event = { target: { name: 'name', value: name } };
      wrapper.find('input').simulate('change', event);

      expect(wrapper.state('values')).toBe({ name });
    })
  })
})
