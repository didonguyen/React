// import { render, screen } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import List from './components/List';

Enzyme.configure({ adapter: new Adapter() });

describe('List', () => {
  const props = {
    list: [
      {title: '1', author: '1', objectID: '1'},
      {title: '2', author: '2', objectID: '2'},
      // {title: '3', author: '3', objectID: '3'},
    ]
  };

  it('show two items in list', () => {
    const element = shallow(
      <List {...props} />
    );

    expect(element.find('.item').length).toBe(2);
  });

})

// describe('App', () => {
//   it('reners without crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<App />, div);
//     ReactDOM.unmountComponentAtNode(div);
//   });

//   test('has a valid snapshot', () => {
//     const component = renderer.create(
//       <App />
//     );
//     let tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
//   })

// })


// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


