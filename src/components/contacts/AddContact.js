import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';

import axios from 'axios';

class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    let validForm = this.errorCheck();
    if (!validForm) {
      return;
    }

    const newContact = {
      name,
      email,
      phone
    };

    var response = await axios.post(
      'https://jsonplaceholder.typicode.com/users/',
      newContact
    );
    dispatch({ type: 'ADD_CONTACT', payload: response.data });

    this.setState({
      name: '',
      email: '',
      phone: ''
    });

    this.props.history.push('/');
  };

  errorCheck = () => {
    const { name, email, phone } = this.state;
    // error checking
    if (name === '') {
      this.setState({
        errors: {
          name: 'Name is required'
        }
      });
      return;
    }
    if (email === '') {
      this.setState({
        errors: {
          email: 'Email is required'
        }
      });
      return;
    }
    if (phone === '') {
      this.setState({
        errors: {
          phone: 'Phone number is required'
        }
      });
      return;
    }

    return 1;
  };

  onFieldChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name..."
                    value={name}
                    onChange={this.onFieldChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    placeholder="Enter Email..."
                    value={email}
                    onChange={this.onFieldChange}
                    type="email"
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter Phone..."
                    value={phone}
                    onChange={this.onFieldChange}
                    error={errors.phone}
                  />

                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
