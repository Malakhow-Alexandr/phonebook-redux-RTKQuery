import { ContactListItem } from 'components/contactsListItem/ContactsListItem';
import { ListStyled } from './ContactList.styled';
import { getFilter } from 'redux/selectors';
import { useGetContactsQuery } from 'redux/contactsSlice';
import { useSelector } from 'react-redux';

export const ContactsList = () => {
  const { data, isFetching, isError, error } = useGetContactsQuery();

  const filter = useSelector(getFilter);

  const normalizedFilter = filter.toLowerCase();

  const filterContacts = data => {
    if (data) {
      const filteredContacts = data.filter(item =>
        item.name.toLowerCase().includes(normalizedFilter)
      );
      return filteredContacts;
    }
    return;
  };

  const filteredContacts = filterContacts(data);

  return (
    <ListStyled>
      {filteredContacts?.map(({ id, name, number }) => (
        <ContactListItem key={id} id={id} name={name} number={number} />
      ))}
    </ListStyled>
  );
};
