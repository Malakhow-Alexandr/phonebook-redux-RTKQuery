import { ContactListItem } from 'components/contactsListItem/ContactsListItem';
import { ListStyled } from './ContactList.styled';
import { getFilter } from 'redux/selectors';
import { useGetContactsQuery } from 'redux/contactsSlice';
import { useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';

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

  if (isError) {
    toast.error(`Sorry we have a ${error.message}, please reload page!`);
  }
  return (
    <ListStyled>
      <ThreeDots
        height="50"
        width="50"
        color="#e9eee8"
        ariaLabel="three-circles-rotating"
        wrapperStyle={{ position: 'absolute', top: -190, left: 120 }}
        visible={isFetching}
        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
      />
      {filteredContacts?.map(({ id, name, number }) => (
        <ContactListItem key={id} id={id} name={name} number={number} />
      ))}
    </ListStyled>
  );
};
