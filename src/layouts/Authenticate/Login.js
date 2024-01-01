import React, { Component } from 'react';
import { connect } from 'react-redux';
import Lottie from 'lottie-react';
import { Form } from 'react-bootstrap';
import { historyPush } from '../../routes/historyPush';
import { setLoadingStatus } from '../../store/actions/authAction';
import Loading from '../../components/shared/Loading/Loading';
import HOC from '../../components/shared/HOC';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false,

      /* Error Handling */
      emailError: false,
      passwordError: false,
    };

    this.handleUserInput = this.handleUserInput.bind(this);
  }

  componentDidMount() {
    if (this.props.location.search === '') {
      if (this.props.auth.isLoggedIn) {
        historyPush('/dashboard');
      } else {
        this.props.setLoadingStatus(false);
      }
    } else {
      if (this.props.auth.isLoggedIn) {
        this.props.onLogout();
      }
    }
  }

  componentWillUnmount() {
    this.props.setLoadingStatus(false);
  }

  handleUserInput(e) {
    const id = e.target.id;
    const { value } = e.target;

    if (id === 'email') {
      this.setState({ email: value });

      if (this.state.emailError) {
        this.setState({ emailError: false });
      }
    } else if (id === 'password') {
      this.setState({ password: value });

      if (this.state.passwordError) {
        this.setState({ passwordError: false });
      }
    }
  }

  render() {
    const { email, password, emailError, passwordError, isLoading } =
      this.state;

    return (
      <div className="Login">
        <div className="login-wrapper">
          <div className="row mx-0 px-0 bg-white">
            <div className="col-lg-6 leftContainer d-flex flex-column">
              <div className="formContainer container">
                <div className="row text-center">
                  <div className="col-12">
                    <div className="logo-container">
                      <img
                        src={require('../../assets/auth/tt-5g.png').default}
                        alt="login-logo"
                        className="login-logo"
                      />
                      <img
                        src={
                          require('../../assets/auth/tt-gobeyond.png').default
                        }
                        alt="go-beyond"
                        className="go-beyond"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <h4>Homework Management System</h4>
                  </div>
                </div>
                <div className="col-12 pt-3">
                  <div className="row">
                    <div className="col-12">
                      <div className="text-divider">
                        <small>login with registered email</small>
                      </div>
                    </div>
                    <div className="col-12">
                      <Form>
                        <div className="row">
                          <div className="col-12">
                            <Form.Group controlId="email">
                              <Form.Label>Email address</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter your email"
                                value={email}
                                className={emailError ? 'is-invalid' : ''}
                                onChange={(e) => this.handleUserInput(e)}
                              />
                              {emailError && (
                                <Form.Text>Email is required</Form.Text>
                              )}
                            </Form.Group>
                          </div>
                        </div>
                        <HOC>
                          <div className="row">
                            <div className="col-12">
                              <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                  type="password"
                                  placeholder="Enter your password"
                                  value={password}
                                  className={passwordError ? 'is-invalid' : ''}
                                  onChange={(e) => this.handleUserInput(e)}
                                />
                                {passwordError && (
                                  <Form.Text>Password is required</Form.Text>
                                )}
                              </Form.Group>
                            </div>
                          </div>
                        </HOC>
                        <div className="row">
                          <div className="col-12">
                            <button
                              className="btn main-btn w-100"
                              type="submit"
                              disabled={isLoading || this.props.auth.isLoading}
                            >
                              {!isLoading ? <span>Login</span> : <Loading />}
                            </button>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 rightContainer">
              <Lottie
                animationData={require('../../assets/auth/login-bg.json')}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setLoadingStatus: (isLoading) => dispatch(setLoadingStatus(isLoading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
