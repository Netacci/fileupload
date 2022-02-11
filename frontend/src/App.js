import React, { useState } from 'react';
import { useFormik } from 'formik';

const App = () => {
  const [persons, setPersons] = useState([]);
  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
      photo: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label> Name</label>
        <input
          type='text'
          name='name'
          onChange={formik.handleChange}
          value={formik.values.name}
        />
      </div>
      <div>
        <label> Number</label>
        <input
          type='tel'
          name='number'
          onChange={formik.handleChange}
          value={formik.values.number}
        />
      </div>
      <div>
        <label> Upload File</label>
        <input
          type='file'
          name='photo'
          accept='image/*'
          onChange={(e) =>
            formik.setFieldValue('photo', e.currentTarget.files[0])
          }
        />
      </div>

      <button type='submit'>Submit</button>
    </form>
  );
};

export default App;
