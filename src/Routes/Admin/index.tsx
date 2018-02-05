import React, { Component } from 'react';
import axios from 'axios';

interface IState {
  name: string;
}

class Admin extends Component {
  state: IState;
  constructor(props: {}) {
    super(props);
    this.state = {
      name: ''
    };
  }

  componentDidMount() {
    axios('/api/name').then(res => {
      this.setState({
        name: res.data.name
      });
    });
  }

  render() {
    return (
      <div>
        This is the admin page <p>Hello {this.state.name}</p>
      </div>
    );
  }
}

export default Admin;
