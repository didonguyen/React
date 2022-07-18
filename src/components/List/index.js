import { Component } from 'react';
import { SubmitButton, SortButton } from '../Buttons';
import Search from '../Search';
import PropTypes from 'prop-types';

import Loading from '../Loading';

// CSS
import './index.css';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: props.searchTerm,
            filteredList: props.list,
            currentPage: props.currentPage,
            error: props.error,
            isLoading: props.isLoading,
            sortKey: props.sortKey
        }
        this.onSearchSubmit = (event) => props.onSearchSubmit(event, this.state.searchTerm);
        this.morePage = () => props.morePage(this.state.searchTerm, this.state.currentPage + 1);
        this.onSort = (sortKey) => props.onSort(sortKey);
    }

    Sort = ({ sortKey, className, activeSortKey, onSort, children }) => {
        if (sortKey === activeSortKey) {
            className=`${className} button-active`
        }
        return (
            <SortButton className={className} onClick={() => onSort(sortKey)}>
                {children}
            </SortButton>
        )
    }

    withLoading = (Component) => ({ isLoading, ...rest }) =>
        isLoading
        ? <Loading />
        : <Component {...rest} />

    ButtonWithLoading = this.withLoading(SubmitButton);

    onDismiss = (objectID) => {
        const updatedList = this.state.filteredList.filter(item => item.objectID !== objectID);
        this.setState({ filteredList: updatedList });
    }

    onClickMe = () => {
        console.log('this in onClickMe', this);
    }

    onSearchChange = (e) => {
        // const { searchTerm } = this.state;
        this.setState({ searchTerm: e.target.value });
        // const filteredList = this.state.list.filter(item => (item.title.toLowerCase().includes(searchTerm.toLowerCase())));
        // this.setState({ filteredList });
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({ 
                filteredList: this.props.list,
                currentPage: this.props.currentPage,
                error: this.props.error,
                isLoading: this.props.isLoading,
                sortKey: this.props.sortKey
            })
        }
    }
    
    render() {
        const { filteredList, searchTerm, error, isLoading, sortKey } = this.state;
        const ButtonWithLoading = this.ButtonWithLoading;
        const Sort = this.Sort;
        const onSort = this.onSort;
        return (
            <div>
                <div className='search'>
                    <div className='search-title'>Search Title New</div>
                    <Search 
                        placeHolder='Search the title' 
                        className='search-input' 
                        value={searchTerm} 
                        onChange={this.onSearchChange} 
                        onSubmit={this.onSearchSubmit}
                    ></Search>
                </div>
                
                <div className='list-item'>
                    {
                        error
                        ? <div className='interactions'>
                            <p>Something went wrong.</p>
                        </div>
                        : 
                        <div>
                            <div className='list__sort-group'>
                                <Sort 
                                    sortKey='TITLE' 
                                    className='list__sort-btn'
                                    activeSortKey={sortKey}
                                    onSort={onSort}
                                >
                                    Sort By Title
                                </Sort>
                                <Sort 
                                    sortKey='AUTHOR'
                                    className='list__sort-btn'
                                    activeSortKey={sortKey}
                                    onSort={onSort}
                                >
                                    Sort By Author
                                </Sort>
                            </div>
                        {
                            (filteredList).map(item => 
                                <div key={item.objectID} className='item'>
                                    <div className='item-content'>
                                        <a href={item.url} className='item-title'>
                                            { item.title }
                                        </a>
                                        <div className='item-author'>
                                            { item.author }
                                        </div>
                                    </div>
                                    <div>
                                        <SubmitButton onClick={() => this.onDismiss(item.objectID)}>Delete</SubmitButton>
                                    </div>
                                </div>    
                            )
                        }
                        </div>
                    }
                </div>
                <div className='pagination'>
                    <div className='pagination__current'>Total Titles: {filteredList.length}</div>
                    {/* Use With Higher Order Function */}
                    <ButtonWithLoading
                        isLoading={isLoading}
                        className='pagination__button-more'
                        onClick={() => this.morePage()}
                    >
                        More Topic
                    </ButtonWithLoading>
                    {/* Use With Conditional */}
                    {/* {
                        isLoading
                        ? <Loading />
                        : <SubmitButton className='pagination__button-more' onClick={() => this.morePage()}>More Topic</SubmitButton>
                    } */}
                </div>
                {/* Click Me For Test */}
                {/* <div>
                    <SubmitButton onClick={this.onClickMe}>
                        Click me!
                    </SubmitButton>
                </div> */}
            </div>
        )
    }
}

List.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            objectID: PropTypes.string.isRequired,
            author: PropTypes.string,
            url: PropTypes.string,
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
    currentPage: PropTypes.number.isRequired,
    searchTerm: PropTypes.string.isRequired
}

export default List;