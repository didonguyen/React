import { Component } from 'react';
import axios from 'axios';
import { sortBy } from 'lodash';

import List from '../List/index.js';

import {
    DEFAULT_QUERY,
    DEFAULT_HPP,
    PATH_BASE,
    PATH_SEARCH,
    PARAM_SEARCH,
    PARAM_PAGE,
    PARAM_HPP
} from '../../constants/index.js';

// CSS
import './index.css';

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author')
}

class AppContainer extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: true,
      sortKey: 'NONE',
      isSortReverse: false
    }
  }

  onSort = (sortKey) => {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
    const { searchKey, results } = this.state;
    let sortedList;
    isSortReverse 
    ? sortedList = SORTS[sortKey](this.state.results[this.state.searchKey].hits)
    : sortedList = this.state.results[this.state.searchKey].hits.reverse();
    this.setState({
      results: { 
        ...results,
        [searchKey]: {
          ...[searchKey],
          hits: sortedList
        }
      }
    })
  }

  needToSearchTopStories = (searchTerm) => {
    return !this.state.results[searchTerm];
  }

  handleMorePage = (searchTerm, nextPage) => {
    this.fetchSearchTopStories(searchTerm, nextPage);
  }

  updateSearchTopStoriesState = (hits, page) => (prevState) => {
    const { searchKey, results } = prevState;

    const oldHits = results && results[searchKey]
    ? results[searchKey].hits
    : [];

    const updatedHits = [
      ...oldHits,
      ...hits
    ];
    return {
      results: { 
        ...results,
        [searchKey]: { hits: updatedHits, page }
      },
      isLoading: false
    }
  }

  setSearchTopStories = (result) => {
    const { hits, page } = result;
    this.setState(this.updateSearchTopStoriesState(hits, page));
  }

  fetchSearchTopStories = (searchTerm, page = 0) => {
    this.setState({ isLoading: true });

    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(result => this._isMounted && this.setSearchTopStories(result.data))
      .catch(error => this._isMounted && this.setState({ error }))
  }

  onSearchSubmit = (event, searchTermState) => {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    if (this.needToSearchTopStories(searchTermState)) {
      this.fetchSearchTopStories(searchTermState);
    }
    event.preventDefault();
  }

  componentDidMount() {
    this._isMounted = true;
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { 
      searchTerm, 
      results, 
      searchKey,
      error,
      isLoading,
      sortKey
    } = this.state;

    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
    ) || 0;

    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];

    return (
      <List
        list={list}
        searchTerm={searchTerm}
        currentPage={page}
        error={error}
        isLoading={isLoading}
        searchKey={searchKey}
        sortKey={sortKey}
        onSort={this.onSort}
        onSearchSubmit={this.onSearchSubmit}
        morePage={this.handleMorePage}
      />
    )
  }
}

export default AppContainer;
