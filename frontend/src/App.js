import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const url = 'http://localhost:3001/api/persons/';
  useEffect(() => {
    axios.get(url).then((res) => {
      setPersons(res.data);
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
      photo: '',
    },
    onSubmit: (values) => {
      console.log(values);

      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      axios.post(url, formData).then((res) => {
        setPersons(persons.concat(res.data));
      });
    },
  });
  console.log(persons);
  return (
    <>
      <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
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
      <div>
        {persons.map((person) => (
          <div key={person.id}>
            <img src={person.photo} alt='profile-pic' />
            <h4>Name:{person.name}</h4>
            <h4>Number:{person.number}</h4>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
