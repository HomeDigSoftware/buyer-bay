import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react";

// A simple component that shows the pathname of the current location
class ShowTheLocation extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {
    const { match, location, history } = this.props;

    return <div>You are now at {match} {location} {history}</div>;
  }
}

// Create a new component that is "connected" (to borrow redux
// terminology) to the router.
//const ShowTheLocationWithRouter = withRouter(ShowTheLocation);
//console.log(withRouter(ShowTheLocation).match)

export default ShowTheLocation;
