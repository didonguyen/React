import { Component } from 'react';
import './index.css';

class SortButton extends Component {
    render() {
        const { 
            className,
            children,
            onClick,
        } = this.props
        return (
            <button
                onClick={onClick}
                className={`${className} btn`}
                type='button'
            >
                {children}
            </button>
        )
    }
}

export default SortButton;