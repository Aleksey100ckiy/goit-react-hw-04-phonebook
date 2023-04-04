import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import { FormFieldSt } from './FormField.styled'


const FormFieldSchema = Yup.object().shape({
      number: Yup.number().positive('!!! > 0 !!!').min(2, 'too short!').required('Required'),
      name: Yup.string().min(2, 'too short!').required('Required'), 
});

export const FormField = ({onSubmit, contArr}) =>{

  return (
    <Formik
      initialValues={{
        number: '',
        name: ''
      }}

      validationSchema={FormFieldSchema}

      onSubmit={values => {
        for (const contact of contArr) {
          if( values.name === contact.name){
            alert(`${values.name} is already in contacts!`)
            return
        }
        }
        console.log(values.name);
        console.log(values);
        onSubmit({
          ...values,
          id:nanoid(),
        })
      }}>
      
      <Form>
        <FormFieldSt>Name
          <Field id="firstName" name="name" placeholder="Name" />
          <ErrorMessage name="name" />
        </FormFieldSt>
        <FormFieldSt>Number
          <Field id="secName" name="number" placeholder="Number" />
          <ErrorMessage name="number" />
        </FormFieldSt>
        <button type='submit'>Add contacts</button>
      </Form>

      </Formik>

  );
}
