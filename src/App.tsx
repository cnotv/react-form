import React, { useState } from 'react';
import Form from './components/Form';
import { inputsToValues } from './helpers/form.helper';

function App() {
  const inputs: Dictionary<FormInputs> = {
    name: {
      name: 'name',
      placeholder: 'Your name',
      label: 'Name',
      validations: [{
        validate: (str: string) => !!str,
        message: 'Please add your name'
      }]
    },
    'wooga-name': {
      name: 'wooga-name',
      placeholder: 'Prefix wooga.name',
      value: 'wooga.name',
      label: 'Wooga name (try to cancel)',
      validations: [{
        validate: str => /^wooga.name/g.test(str),
        message: 'Please prefix the Wooga name with "wooga.name"'
      }]
    }
  };

  const [values, setValues] = useState(inputsToValues(inputs));

  return (
    <main className="wrapper">
      <div className="card">
        <Form
          inputs={inputs}
          onSubmit={(val: Dictionary<string>) => setValues(val)}
        />

        <h2>Data:</h2>
        <pre>
          {Object.keys(values).map((name, i) => (
            <p key={i}><b>{name}:</b> {values[name]}</p>
          ))}
        </pre>
      </div>
    </main>
  );
}

export default App;
