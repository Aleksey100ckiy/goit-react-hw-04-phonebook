import React, { Component } from "react";
import { FormField } from './FormField/FormField'
import ContactList from "./ContactList/ContactList";
import FindField from "./FindField/FindField";

export class App extends Component {

  state = {
  contacts: [],
  filter: '',
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    // console.log(parsedContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  
  addContact = newContact => {
    
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact]
        
      }
    });

  }
  deleteContact = (contactId) => {
    console.log(contactId);
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== contactId)
      }
    })
  }

  handleChanging = evt => {

  this.setState({filter: evt.target.value})
  }

  filterBook = () => {
    const contactsArr = this.state.contacts;
    const findEl = this.state.filter;
    const filterEl = contactsArr.filter(contact => contact.name.toLowerCase().includes(findEl));
    return filterEl;
  }
  
  render() {
    const memoryState = this.state.contacts;
    const filterEl = this.filterBook();
    return (
      <div>
        <FormField contArr={this.state.contacts} onSubmit={this.addContact}></FormField> 
        <FindField value={this.state.filter} onChange={this.handleChanging}></FindField>
        {(memoryState.length > 0) ? <ContactList onDelete={this.deleteContact } contactsList={ filterEl ? filterEl : memoryState} ></ContactList> :
        <p>Contacts</p>}
      </div>
    )}
};

