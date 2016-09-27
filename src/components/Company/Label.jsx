import React, { PropTypes } from 'react';

export default class Label extends React.Component {

  static propTypes = {
    ass: React.PropTypes.string,
  };

  componentWillMount() {
    console.log(this.props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState);
  }
  render() {
    return (<div>MyComponent</div>);
  }
}

Label.propTypes = {
};
