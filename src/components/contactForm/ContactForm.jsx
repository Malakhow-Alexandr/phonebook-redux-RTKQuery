import { ErrorMessage, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { formatNumber } from 'utils/formatNumber';
import { formatName } from 'utils/formatName';
import { addContacts } from 'redux/operations';
import { useAddContactMutation } from 'redux/contactsSlice';

import * as yup from 'yup';

import {
  StyledForm,
  Label,
  StyledErrorMessage,
  StyledField,
  Button,
  StyledLabel,
} from './ContactForm.styled';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      `Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan`
    )
    .required(),
  number: yup
    .string()
    .trim()
    .test(
      'maxDigits',
      'Phone number must not have more than 12 digits',
      value => {
        if (!value) return true; // Skip validation if no value is provided
        const numDigits = value.replace(/\D/g, '').length; // Count the number of digits
        return numDigits <= 12; // Return true if the number of digits is less than or equal to 12
      }
    )
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{0,}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(),
});

export const ContactForm = () => {
  const [addContact] = useAddContactMutation();

  const initialValues = { name: '', number: '' };

  const handleSubmit = (values, { resetForm }) => {
    // if (contacts.map(contact => contact.name).includes(values.name)) {
    //   return alert(`${values.name} is alredy in contacts.`);
    // }

    const contact = {
      name: formatName(values.name),
      number: formatNumber(values.number),
    };

    addContact(contact);

    resetForm();
  };
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <StyledForm>
        <Label>
          <StyledField type="text" name="name" />
          <StyledLabel>Name</StyledLabel>
          <ErrorMessage component={StyledErrorMessage} name="name" />
        </Label>

        <Label>
          <StyledField type="tell" name="number" />
          <StyledLabel>Number</StyledLabel>
          <ErrorMessage component={StyledErrorMessage} name="number" />
        </Label>

        <Button type="submit">Add Contact</Button>
      </StyledForm>
    </Formik>
  );
};
