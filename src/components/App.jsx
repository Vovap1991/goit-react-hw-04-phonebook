import React, { Component } from 'react';

import { ContactForm } from './Form/Form';
import { Application, FormTitle } from './App.styled';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      this.setState({
        contacts: JSON.parse(savedContacts),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = newContact => {
    const { contacts } = this.state;

    const isContactExists = contacts.find(
      contact =>
        contact.name.toLowerCase() === newContact.name.toLowerCase() ||
        contact.number === newContact.number
    );

    if (isContactExists) {
      return alert(`${newContact.name} is already in your phonebook`);
    }

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  };

  changeContactFilter = newFilter => {
    this.setState({ filter: newFilter });
  };

  handleDelete = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };

  render() {
    const { filter, contacts } = this.state;

    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <Application>
          <div>
            <FormTitle>Phonebook</FormTitle>
            <ContactForm onAddContact={this.addContact}></ContactForm>
          </div>
          <div>
            <FormTitle>Contacts</FormTitle>
            <Filter value={filter} onChange={this.changeContactFilter} />
            <ContactList
              contacts={visibleContacts}
              onDelete={this.handleDelete}
            />
          </div>
        </Application>
      </div>
    );
  }
}
