import { Dna } from 'react-loader-spinner';

import PropTypes from 'prop-types';
import {
  ListItemStyled,
  ButtonListItem,
  ContactDesc,
} from './ContactListItem.styled';

import { useDeleteContactMutation } from 'redux/contactsSlice';
import { toast } from 'react-toastify';

export const ContactListItem = ({ id, name, number }) => {
  const [deleteContact, { isLoading, isSuccess }] = useDeleteContactMutation();
  if (isSuccess) {
    toast.success(`${name} deleted from contacts `);
  }
  return (
    <>
      <ListItemStyled>
        <ButtonListItem
          disabled={isLoading}
          onClick={() => {
            deleteContact(id);
          }}
        >
          <span>{isLoading ? <Dna height="40" width="40" /> : 'Delete'}</span>
        </ButtonListItem>
        <ContactDesc>{number}</ContactDesc>
        <ContactDesc>{name} :</ContactDesc>
      </ListItemStyled>
    </>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
