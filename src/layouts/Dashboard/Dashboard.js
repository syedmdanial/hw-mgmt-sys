import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Form } from "react-bootstrap";
import { getRequest } from "../../helpers/apiHandlers";

/* common */
import WrapperCard from "../../components/shared/Cards/WrapperCard";
// import Loading from '../../components/shared/Loading/Loading';

/* components */
import HomeworkTable from "../../components/Dasboard/HomeworkTable";
import AddHomeworkModal from "../../components/Dasboard/AddHomeworkModal";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      homework: [],
      showAddHomeworkModal: false,
    };

    this.handleCloseAddHomeworkModal =
      this.handleCloseAddHomeworkModal.bind(this);
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

  handleAction(e, id) {
    console.log("action ", e.target.id, id);
  }

  handleCloseAddHomeworkModal() {
    this.setState((prevState) => ({
      showAddHomeworkModal: !prevState.showAddHomeworkModal,
    }));
  }

  handleSaveAddHomework() {
    console.log("save homework");
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
                    handleAction={(e, id) => this.handleAction(e, id)}
                    handleCloseAddHomeworkModal={
                      this.handleCloseAddHomeworkModal
                    }
                  />
                </Form.Group>
              </Card.Body>
            </WrapperCard>
          </div>
        </div>
        <AddHomeworkModal
          isLoading={isLoading}
          showAddHomeworkModal={this.state.showAddHomeworkModal}
          handleCloseAddHomeworkModal={this.handleCloseAddHomeworkModal}
          handleSaveAddHomework={this.handleSaveAddHomework}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
