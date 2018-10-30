import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Consumer } from '../../context';

class Contact extends Component {
  static propTypes = {
    contact: PropTypes.object.isRequired
  };

  state = {
    showContactInfo: false
  };

  onShowClick = () => {
    this.setState({
      showContactInfo: !this.state.showContactInfo
    });
  };

  onDeleteClick = async (id, dispatch) => {
    try {
      await axios.delete(`${Consumer.JSONURL}/users/${id}`);
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    } catch (e) {
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    }
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;

    const showInfoClass = showContactInfo ? 'show-info' : '';

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="contact-card card card-body mb-3">
              <h4 className="list-name">
                <div className="cust-name">{name}</div>
                {/* Detials Link */}
                <i
                  className="details-link fas fa-sort-down ml-3"
                  onClick={this.onShowClick}
                />
                {/* Edit Link */}
                <Link
                  to={`contact/edit/${id}`}
                  className="edit-link"
                  title="Edit Contact"
                >
                  <i className="fas fa-pencil-alt" />
                </Link>
                {/* Delete Link */}
                <i
                  className="delete-link fas fa-times"
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />
              </h4>
              <ul className={'list-group ' + showInfoClass}>
                <li className="list-group-item">Email: {email}</li>
                <li className="list-group-item">Phone: {phone}</li>
              </ul>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Contact;
