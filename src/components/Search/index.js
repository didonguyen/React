import React, { useEffect } from 'react';
import './index.css';

function Search ({ placeHolder, className, value, onChange, onSubmit, children = 'Submit' }) {

    const searchInput = React.useRef(null);

    // useEffect with second argument [], be executed once after every render like componentDidMount
    useEffect(() => {
        searchInput.current.focus();
    }, []);

    return (
        <form onSubmit={onSubmit}>
            <div className='search-wrap'>
                <input
                    className={className}
                    placeholder={placeHolder}
                    onChange={onChange}
                    value={value}
                    ref={searchInput}
                >
                </input>
                <button type='submit' className='btn btn-submit'>{children}</button>
            </div>
        </form>
    )
}

export default Search;