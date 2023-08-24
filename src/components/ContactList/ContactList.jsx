import { ListItem, DeleteContactButton, List } from './ContactList.styled';

export const ContactList = ({ contacts, onDelete }) => {
  return (
    <List>
      {contacts.map(contact => (
        <ListItem key={contact.id}>
          {contact.name}:{''} {contact.number}
          <DeleteContactButton
            onClick={() => {
              onDelete(contact.id);
            }}
          >
            Delete
          </DeleteContactButton>
        </ListItem>
      ))}
    </List>
  );
};
