import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      this.checkAuth(this.props.isAuthenticated);
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.isAuthenticated);
    }

    checkAuth(isAuthenticated) {
      if (!isAuthenticated) {
        const redirectAfterLogin = this.props.location.pathname;
        this.props.dispatch(push(`/login?next=${redirectAfterLogin}`));
      }
    }

    render() {
      return (
        <div>

           {this.props.isAuthenticated === true
                        ? <Component {...this.props} />
                        : null}
        </div>);
    }
  }

  AuthenticatedComponent.propTypes = {
  };

  function mapStateToProps({ auth }) {
    return {
      token: auth.token,
      userName: 'shen',
      isAuthenticated: auth.isAuthenticated,
    }
  }
  return connect(mapStateToProps)(AuthenticatedComponent);
}
