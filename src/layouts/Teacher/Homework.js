import React, { Component } from "react";
import { connect } from "react-redux";
import { getRequest } from "../../helpers/apiHandlers";
import { historyPush } from "../../routes/historyPush";
import { getSubjectList } from "../../store/actions/homeworkAction";
import { dataModeling } from "../../helpers/helperFunction";

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
      subjectOptions: [],
      showAddHomeworkModal: false,
      showEditHomeworkModal: false,
    };

    this.handleCloseAddHomeworkModal =
      this.handleCloseAddHomeworkModal.bind(this);
    this.handleCloseEditHomeworkModal =
      this.handleCloseEditHomeworkModal.bind(this);
    this.getSubjectOptions = this.getSubjectOptions.bind(this);
  }

  componentDidMount() {
    this.getData();
    this.getSubjectOptions();
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

  async getSubjectOptions() {
    try {
      const subjectOptions = await this.props.getSubjectList();
      // console.log(dataModeling(subjectOptions, "subject"));
      let _options = dataModeling(subjectOptions, "subject");
      // console.log(subjectOptions);
      this.setState({ subjectOptions: _options });
    } catch (err) {
      console.log(err);
      this.setState({ subjectOptions: [] });
    }
  }

  handleAction(e, item) {
    console.log("action ", e.target.id, item);

    const { id } = e.target;

    if (id === "edit-homework") {
      this.handleCloseEditHomeworkModal(item);
    } else if (id === "view-students") {
      historyPush(
        `/homework/${item.title.toLowerCase().replace(/ /g, "-")}/students`
      );
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
    const { isLoading, homework, subjectOptions } = this.state;

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
            options={subjectOptions}
          />
        )}
        {this.state.showEditHomeworkModal && (
          <EditHomeworkModal
            isLoading={isLoading}
            homeworkData={this.state.homeworkData}
            showEditHomeworkModal={this.state.showEditHomeworkModal}
            handleCloseEditHomeworkModal={this.handleCloseEditHomeworkModal}
            handleSaveEditHomework={this.handleSaveEditHomework}
            options={subjectOptions}
          />
        )}
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
  getSubjectList: () => dispatch(getSubjectList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homework);
