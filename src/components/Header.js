import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { user } = this.props;
    return (
      <header>
        <h1>TrybeWallet</h1>
        <p data-testid="email-field">{ user.email }</p>
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

Header.propTypes = {
  user: PropTypes.shape({ email: PropTypes.string.isRequired }).isRequired,
};

export default connect(mapStateToProps)(Header);
