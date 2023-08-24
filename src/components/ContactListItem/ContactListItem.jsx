export const ContactListItem = ({ contact, onDelete }) => {
  return (
    <div>
      <div>{contact.name}</div>
      <button onClick={() => onDelete(contact.id)}>Delete</button>
    </div>
  );
};
