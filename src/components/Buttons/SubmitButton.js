import { Component } from 'react';
import './index.css';

class SubmitButton extends Component {
    render() {
        const { 
            onClick,
            children,
        } = this.props
        return (
            <button
                onClick={onClick}
                className='btn'
                type='button'
            >
                {children}
            </button>
        )
    }
}

export default SubmitButton;