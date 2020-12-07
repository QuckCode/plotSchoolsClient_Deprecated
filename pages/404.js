import { Component } from 'react';
import NotFound from '../components/NotFound';

class Error extends Component {
  render() {
    return (
      <> 
      <NotFound code={404} />
      </>
    );
  }
}

export default Error;
