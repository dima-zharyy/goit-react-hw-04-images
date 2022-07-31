import { useState } from 'react';
import { Header, Form, Button, Input } from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.min.css';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    onSubmit([query.toLowerCase().trim()]);
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
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
