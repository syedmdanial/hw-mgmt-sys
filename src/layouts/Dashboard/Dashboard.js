import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";

/* common */
import WrapperCard from "../../components/shared/Cards/WrapperCard";

/* layout */
import Homework from "../Teacher/Homework";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
                <Homework />
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
