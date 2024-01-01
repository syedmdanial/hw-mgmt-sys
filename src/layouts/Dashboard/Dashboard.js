import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Form } from 'react-bootstrap';
import WrapperCard from '../../components/shared/Cards/WrapperCard';
// import Loading from '../../components/shared/Loading/Loading';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="Dashboard">
        <div className="row">
          <div className="col-12">
            <WrapperCard
              header={{
                exist: false,
              }}
            >
              <Card.Body>
                <Form.Group>
                  <h4>Dasboard</h4>
                </Form.Group>
              </Card.Body>
            </WrapperCard>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
