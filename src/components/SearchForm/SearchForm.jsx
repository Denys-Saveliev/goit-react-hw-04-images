import React, { Component } from 'react';
import s from './SearchForm.module.css';
import { toast } from 'react-toastify';
import IconButton from 'components/IconButton';
import { ReactComponent as SearchIcon } from '../../Icons/search.svg';

class SearchForm extends Component {
  state = {
    search: '',
  };

  handleStateChange = e => {
    this.setState({ search: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.search.trim() === '') {
      return toast.error('Please insert valid request!', {
        position: 'top-left',
        autoClose: 3000,
        theme: 'colored',
      });
    }

    this.props.onSubmit(this.state.search);
    this.resetForm();
  };

  resetForm = () => {
    return this.setState({ search: '' });
  };

  render() {
    return (
      <form className={s.SearchForm} onSubmit={this.handleSubmit}>
        <IconButton aria-label="search">
          <SearchIcon width="20" height="20" />
        </IconButton>

        <input
          className={s.SearchForm__input}
          type="text"
          placeholder="Search images and photos"
          onChange={this.handleStateChange}
        />
      </form>
    );
  }
}

export default SearchForm;
