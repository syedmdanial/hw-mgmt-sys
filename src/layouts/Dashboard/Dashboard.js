import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Form } from "react-bootstrap";
import { getRequest } from "../../helpers/apiHandlers";

/* common */
import WrapperCard from "../../components/shared/Cards/WrapperCard";
// import Loading from '../../components/shared/Loading/Loading';

/* components */
import HomeworkTable from "../../components/Dasboard/HomeworkTable";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      homework: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    this.setState({ isLoading: true }, () => {
      getRequest("/homeworkData", {}, (res) => {
        if (res.success) {
          this.setState({
            isLoading: false,
            homework: res.data,
          });
        } else {
          this.setState({
            isLoading: false,
            homework: [],
          });
        }
      });
    });
  }

  deleteHomework(id) {
    console.log("delete homework", id);
  }

  render() {
    const { isLoading, homework } = this.state;
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
                  <HomeworkTable
                    data={{ isLoading, homework }}
                    deleteHomework={() => this.deleteHomework()}
                  />
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
