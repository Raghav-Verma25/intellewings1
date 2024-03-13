import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';

const Home = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/contacts', {
        firstName,
        middleName,
        lastName,
        email,
        phone1,
        phone2,
        address,
      });
      setFirstName('');
      setMiddleName('');
      setLastName('');
      setEmail('');
      setPhone1('');
      setPhone2('');
      setAddress('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
      </label>
      <label>
        Middle Name:
        <input
          type="text"
          value={middleName}
          onChange={(event) => setMiddleName(event.target.value)}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label>
        Phone 1:
        <input
          type="text"
          value={phone1}
          onChange={(event) => setPhone1(event.target.value)}
        />
        </label>
        </form>)}
    export default Home;