import React, { Component } from "react";
import { getRequest } from "../../helpers/apiHandlers";

/* components */
import HomeworkTable from "../../components/Teacher/HomeworkTable";
import AddHomeworkModal from "../../components/Teacher/AddHomeworkModal";
import EditHomeworkModal from "../../components/Teacher/EditHomeworkModal";

class Homework extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      homework: [],
      homeworkData: null,
      showAddHomeworkModal: false,
      showEditHomeworkModal: false,
    };

    this.handleCloseAddHomeworkModal =
      this.handleCloseAddHomeworkModal.bind(this);
    this.handleCloseEditHomeworkModal =
      this.handleCloseEditHomeworkModal.bind(this);
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

  handleAction(e, item) {
    console.log("action ", e.target.id, item);

    const { id } = e.target;

    if (id === "edit-homework") {
      this.handleCloseEditHomeworkModal(item);
    }
  }

  handleCloseAddHomeworkModal() {
    this.setState((prevState) => ({
      showAddHomeworkModal: !prevState.showAddHomeworkModal,
    }));
  }

  handleCloseEditHomeworkModal(item) {
    if (this.state.showEditHomeworkModal) {
      this.setState({
        homeworkData: null,
        showEditHomeworkModal: false,
      });
    } else if (!this.state.showEditHomeworkModal) {
      this.setState({
        homeworkData: item,
        showEditHomeworkModal: true,
      });
    }
  }

  handleSaveAddHomework() {
    console.log("[Add] save homework");
  }

  handleSaveEditHomework() {
    console.log("[Edit] save homework");
  }

  render() {
    const { isLoading, homework } = this.state;

    return (
      <div className="homework">
        <HomeworkTable
          data={{ isLoading, homework }}
          handleAction={(e, id) => this.handleAction(e, id)}
          handleCloseAddHomeworkModal={this.handleCloseAddHomeworkModal}
        />
        {this.state.showAddHomeworkModal && (
          <AddHomeworkModal
            isLoading={isLoading}
            showAddHomeworkModal={this.state.showAddHomeworkModal}
            handleCloseAddHomeworkModal={this.handleCloseAddHomeworkModal}
            handleSaveAddHomework={this.handleSaveAddHomework}
          />
        )}
        {this.state.showEditHomeworkModal && (
          <EditHomeworkModal
            isLoading={isLoading}
            homeworkData={this.state.homeworkData}
            showEditHomeworkModal={this.state.showEditHomeworkModal}
            handleCloseEditHomeworkModal={this.handleCloseEditHomeworkModal}
            handleSaveEditHomework={this.handleSaveEditHomework}
          />
        )}
      </div>
    );
  }
}

export default Homework;
