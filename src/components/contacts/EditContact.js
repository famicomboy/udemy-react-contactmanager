import React, { Component } from 'react';
import { Consumer, Settings } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';

import axios from 'axios';

class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await axios.get(`${Settings.apiUrl}/users/${id}`);

    const contact = response.data;

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    let validForm = this.errorCheck();
    if (!validForm) {
      return;
    }

    const updContact = {
      name,
      email,
      phone
    };

    const { id } = this.props.match.params;
    // const response = await axios.put(`${Consumer.JSONURL}/users/${id}`, {
    const response = await axios.put(
      `${Settings.apiUrl}/users/${id}`,
      updContact
    );

    dispatch({ type: 'UPDATE_CONTACT', payload: response.data });

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
              <div className="card-header">Edit Contact</div>
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
                    value="Update Contact"
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

export default EditContact;
