import React, { Component } from "react";
import { connect } from "react-redux";
import Topbar from "./Topbar/Topbar";
import Navbar from "./Navbar/Navbar";
import { onLogout } from "../../store/actions/authAction";

class TopNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInitials: "",
      showTopbar: false,
    };

    this.showTopbarDropdown = this.showTopbarDropdown.bind(this);
    this.hideTopbarDropdown = this.hideTopbarDropdown.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.getUserNameInitials(this.props.user.name);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.getUserNameInitials(this.props.user.name);
    }
  }

  getUserNameInitials(string) {
    const names = string.split(" ");
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }

    this.setState({ userInitials: initials });
  }

  showTopbarDropdown() {
    this.setState({
      showTopbar: true,
    });
  }

  hideTopbarDropdown() {
    this.setState({
      showTopbar: false,
    });
  }

  handleLogout() {
    this.props.onLogout();
  }

  render() {
    const { userInitials, showTopbar } = this.state;

    const { showTopbarDropdown, hideTopbarDropdown, handleLogout } = this;

    return (
      <div className="TopNavBar">
        <Topbar
          data={{
            userInitials,
            showTopbar,
          }}
          handlers={{
            showTopbarDropdown,
            hideTopbarDropdown,
            handleLogout,
          }}
        />
        <Navbar data={{}} handlers={{}} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user, token } = state.auth;
  return {
    user,
    token,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(onLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopNavBar);
