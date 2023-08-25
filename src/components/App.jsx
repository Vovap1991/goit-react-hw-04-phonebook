import { ContactForm } from './Form/Form';
import { Application, FormTitle } from './App.styled';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useState, useEffect } from 'react';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

// Зовнішня функція (передана в useState контактів) для отримання данних з local storage. Якщо там нічого немає - то рендер initial contacts
const getInitialContacts = () => {
  const savedContacts = localStorage.getItem('contacts');
  if (savedContacts !== null) {
    return JSON.parse(savedContacts);
  }
  return initialContacts;
};

export const App = () => {
  const [contacts, setContacts] = useState(getInitialContacts);
  const [filter, setFilter] = useState('');

  // Запис контактів у local storage
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const isContactExists = contacts.find(
      contact =>
        contact.name.toLowerCase() === newContact.name.toLowerCase() ||
        contact.number === newContact.number
    );

    if (isContactExists) {
      return alert(`${newContact.name} is already in your phonebook`);
    }

    setContacts(prevState => [...prevState, newContact]);
  };

  const changeContactFilter = newFilter => {
    setFilter(newFilter);
  };

  const DeleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div>
      <Application>
        <div>
          <FormTitle>Phonebook</FormTitle>
          <ContactForm onAddContact={addContact}></ContactForm>
        </div>
        <div>
          <FormTitle>Contacts</FormTitle>
          <Filter value={filter} onChange={changeContactFilter} />
          <ContactList contacts={visibleContacts} onDelete={DeleteContact} />
        </div>
      </Application>
    </div>
  );
};
