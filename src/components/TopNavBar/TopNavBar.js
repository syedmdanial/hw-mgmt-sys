import React, { Component } from 'react';
import { connect } from 'react-redux';
import Topbar from './Topbar/Topbar';
import Navbar from './Navbar/Navbar';
import { onLogout, getUserCredits } from '../../store/actions/authAction';

class TopNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userStatus: '',
      userName: '',
      companyName: '',
      creditType: '',
      balance: '',
      userInitials: '',
      userTechnical: 0,
      hideNavName: false,
      showMobileNav: false,
      showTopbar: false,
      showSettings: false,
      showWebMessaging: false,
      showAdminTools: false,
    };

    // this.checkSizeOnDidMount = this.checkSizeOnDidMount.bind(this);
    // this.handleResize = this.handleResize.bind(this);
    // this.getUserData = this.getUserData.bind(this);
    this.showTopbarDropdown = this.showTopbarDropdown.bind(this);
    this.hideTopbarDropdown = this.hideTopbarDropdown.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  // componentDidMount() {
  //   this.getUserData();
  //   this.checkSizeOnDidMount();

  //   window.addEventListener('resize', this.handleResize);
  // }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.user !== this.props.user) {
  //     this.getUserData();
  //   }
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.handleResize);
  // }

  // checkSizeOnDidMount() {
  //   if (window.innerWidth <= 903 && this.state.hideNavName) {
  //     this.setState({
  //       hideNavName: false,
  //       showMobileNav: false,
  //     });
  //   } else if (window.innerWidth > 903 && this.state.showMobileNav) {
  //     this.setState({
  //       hideNavName: false,
  //       showMobileNav: false,
  //     });
  //   }
  // }

  // handleResize() {
  //   if (window.innerWidth <= 903 && this.state.hideNavName) {
  //     this.setState({
  //       hideNavName: false,
  //       showMobileNav: false,
  //     });
  //   } else if (window.innerWidth > 903 && this.state.showMobileNav) {
  //     this.setState({
  //       hideNavName: false,
  //       showMobileNav: false,
  //     });
  //   }
  // }

  // getUserNameInitials(string) {
  //   const names = string.split(' ');
  //   let initials = names[0].substring(0, 1).toUpperCase();

  //   if (names.length > 1) {
  //     initials += names[names.length - 1].substring(0, 1).toUpperCase();
  //   }
  //   return initials;
  // }

  // getUserData() {
  //   const { user } = this.props;
  //   this.setState({
  //     userStatus: user.status,
  //     userName: user.username,
  //     companyName: user.companyId.name,
  //     creditType: user.credits.type,
  //     balance: user.credits.credit,
  //     userInitials: this.getUserNameInitials(user.username),
  //     userTechnical: user.technical,
  //   });
  // }

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
    const {
      userInitials,
      showTopbar,
      creditType,
      hideNavName,
      showMobileNav,
      showSettings,
      showWebMessaging,
      showAdminTools,
      userStatus,
      userTechnical,
    } = this.state;

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
        <Navbar
          data={{
            hideNavName,
            showMobileNav,
            showSettings,
            showWebMessaging,
            showAdminTools,
            userStatus,
            userTechnical,
            creditType,
          }}
          handlers={{}}
        />
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
