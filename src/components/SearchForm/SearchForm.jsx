import { useState } from 'react';
import s from './SearchForm.module.css';
import { toast } from 'react-toastify';
import IconButton from 'components/IconButton';
import { ReactComponent as SearchIcon } from '../../Icons/search.svg';
import PropTypes from 'prop-types';

function SearchForm({ onSubmit }) {
  const [search, setSearch] = useState('');

  const handleStateChange = e => {
    setSearch(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (search.trim() === '') {
      return toast.error('Please insert valid request!', {
        position: 'top-left',
        autoClose: 3000,
        theme: 'colored',
      });
    }

    onSubmit(search);

    setSearch('');
  };

  return (
    <form className={s.SearchForm} onSubmit={handleSubmit}>
      <IconButton aria-label="search">
        <SearchIcon width="20" height="20" />
      </IconButton>

      <input
        className={s.SearchForm__input}
        type="text"
        placeholder="Search images and photos"
        onChange={handleStateChange}
      />
    </form>
  );
}

export default SearchForm;

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
