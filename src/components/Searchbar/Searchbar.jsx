import { useState } from 'react';
import { Notification, notify } from 'components';
import { Header, Form, Button, Input } from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.min.css';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      notify('Please type at least one letter!');
      setQuery('');
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <ImSearch />
        </Button>
        <Input
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleInputChange}
        />
      </Form>
      <Notification />
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
