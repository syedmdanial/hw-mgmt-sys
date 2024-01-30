import React, { Component } from "react";
import { connect } from "react-redux";
import { getRequest, postMultipartRequest } from "../../helpers/apiHandlers";
import { historyPush } from "../../routes/historyPush";
import {
  getSubjectList,
  addHomework,
} from "../../store/actions/homeworkAction";
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
    this.handleSaveAddHomework = this.handleSaveAddHomework.bind(this);
  }

  componentDidMount() {
    this.getData();
    this.getSubjectOptions();
  }

  getData() {
    this.setState({ isLoading: true }, () => {
      getRequest("/homeworks", {}, (res) => {
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
      console.log(subjectOptions);
      let _options = dataModeling(subjectOptions, "subject");
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

  async handleSaveAddHomework(data) {
    console.log("[Add] save homework");
    data.token = this.props.user.token;
    // console.log(data);
    // const formData = new FormData();

    // // Append each data field to the formData object
    // for (const key in data) {
    //   console.log(key, data[key]);
    //   formData.append(key, data[key]);
    // }

    // console.log({ formData });
    try {
      const res = await this.props.addHomework(data);
      if (res.success) {
        this.getData();
      }
    } catch (err) {
      console.log(err);
    }

    // try {
    //   // Make the API call directly in the component
    //   const response = await postMultipartRequest(
    //     "/homework",
    //     data,
    //     this.props.user.token
    //   );

    //   console.log(response);
    //   if (response.success) {
    //     // Handle success if needed
    //     console.log("Homework added successfully:", response.data);
    //   } else {
    //     // Handle failure if needed
    //     console.error("Failed to add homework:", response.error);
    //   }
    // } catch (error) {
    //   // Handle any unexpected errors
    //   console.error("Error adding homework:", error);
    // }
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
          options={subjectOptions}
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
  const { user } = state.auth;
  return {
    user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getSubjectList: () => dispatch(getSubjectList()),
  addHomework: (data) => dispatch(addHomework(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homework);
