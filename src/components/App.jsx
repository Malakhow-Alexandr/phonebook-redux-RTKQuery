import { ContactsList } from './contactsList/ContactLis';
import { ContactForm } from './contactForm/ContactForm';
import { ContactFilter } from './ContactFilter/Filter';
import { Section } from './Section/Section';
import { Container } from './Container/Container.styled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
    <Container>
      <Section title={'Phonebook'}>
        <ContactForm></ContactForm>
      </Section>
      <Section title={'Contacts'}>
        <ContactFilter />
        <ContactsList />
      </Section>
      <ToastContainer />
    </Container>
  );
};
