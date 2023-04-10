import PropTypes from 'prop-types';
import {
  ListItemStyled,
  ButtonListItem,
  ContactDesc,
} from './ContactListItem.styled';
import { useDispatch } from 'react-redux';
import { useDeleteContactMutation } from 'redux/contactsSlice';

export const ContactListItem = ({ id, name, number }) => {
  const [deleteContact] = useDeleteContactMutation();
  return (
    <>
      <ListItemStyled>
        <ButtonListItem
          onClick={() => {
            deleteContact(id);
          }}
        >
          <span>Delete</span>
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
