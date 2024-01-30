import React, { Component } from "react";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { historyPush } from "../../routes/historyPush";
import {
  setLoadingStatus,
  registerPassword,
} from "../../store/actions/authAction";
import Loading from "../../components/shared/Loading/Loading";

class CreatePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      isLoading: false,

      /* Error Handling */
      passwordError: false,
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleRegisterPassword = this.handleRegisterPassword.bind(this);
  }

  componentDidMount() {
    if (this.props.location.state) {
      if (this.props.location.state.data) {
        const { email, name } = this.props.location.state.data;
        this.setState({ email, name });
      }
    } else {
      historyPush("/login");
    }
  }

  componentWillUnmount() {
    this.props.setLoadingStatus(false);
  }

  handleUserInput(e) {
    const id = e.target.id;
    const { value } = e.target;

    if (id === "password") {
      this.setState({ password: value });

      if (this.state.passwordError) {
        this.setState({ passwordError: false });
      }
    }
  }

  async handleRegisterPassword() {
    const { email, name, password } = this.state;
    if (email.trim() !== "" && name.trim() !== "" && password.trim() !== "") {
      const data = {
        email,
        name,
        password,
        user_type: 1,
      };

      try {
        const res = await this.props.loginUser(data);
        if (res.success) {
          if (res.code === 4009) historyPush("/login");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  render() {
    const {
      email,
      name,
      password,
      emailError,
      nameError,
      passwordError,
      isLoading,
    } = this.state;

    return (
      <div className="Login">
        <div className="login-wrapper registration-wrapper">
          <div className="row mx-0 px-0 bg-white">
            <div className="col-12 leftContainer d-flex flex-column">
              <div className="formContainer container">
                <div className="row text-center">
                  <div className="col-12 pt-5 mt-5">
                    <h4>Student's Registration</h4>
                  </div>
                </div>
                <div className="col-12 pt-3">
                  <div className="row">
                    <div className="col-12">
                      <div className="text-divider">
                        <small>Enter your password to create account</small>
                      </div>
                    </div>
                    <div className="col-12">
                      <Form>
                        <div className="row">
                          <div className="col-12">
                            <Form.Group controlId="email">
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter your email"
                                value={email}
                                className={emailError ? "is-invalid" : ""}
                                onChange={(e) => this.handleUserInput(e)}
                                disabled={true}
                              />
                              {emailError && (
                                <Form.Text>Email is required</Form.Text>
                              )}
                            </Form.Group>
                          </div>
                          <div className="col-12 mt-2">
                            <Form.Group controlId="name">
                              <Form.Label>Name</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                className={nameError ? "is-invalid" : ""}
                                onChange={(e) => this.handleUserInput(e)}
                                disabled={true}
                              />
                              {nameError && (
                                <Form.Text>Name is required</Form.Text>
                              )}
                            </Form.Group>
                          </div>
                          <div className="col-12 mt-2">
                            <Form.Group controlId="password">
                              <Form.Label>Password</Form.Label>
                              <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                className={passwordError ? "is-invalid" : ""}
                                onChange={(e) => this.handleUserInput(e)}
                              />
                              {passwordError && (
                                <Form.Text>Password is required</Form.Text>
                              )}
                            </Form.Group>
                          </div>
                          <div className="col-12">
                            <button
                              className="btn main-btn w-100 mt-5"
                              type="button"
                              disabled={isLoading || this.props.auth.isLoading}
                              onClick={this.handleRegisterUser}
                            >
                              {!isLoading ? (
                                <span>Create Password</span>
                              ) : (
                                <Loading />
                              )}
                            </button>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
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
  registerPassword: (data) => dispatch(registerPassword(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePassword);
