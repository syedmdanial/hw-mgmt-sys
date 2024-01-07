import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { getRequest } from "../../helpers/apiHandlers";

/* common */
import WrapperCard from "../../components/shared/Cards/WrapperCard";

/* components */
import StudentTable from "../../components/Teacher/Student/StudentTable";
import AddStudentModal from "../../components/Teacher/Student/AddStudentModal";

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      students: [],
      studentData: null,
      showAddStudentModal: false,
    };

    this.handleShowAddStudentModal = this.handleShowAddStudentModal.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    this.setState({ isLoading: true }, () => {
      getRequest("/studentData", {}, (res) => {
        if (res.success) {
          this.setState({
            isLoading: false,
            students: res.data,
          });
        } else {
          this.setState({
            isLoading: false,
            students: [],
          });
        }
      });
    });
  }

  handleAction(e, item) {
    console.log("action ", e.target.id, item);

    // const { id } = e.target;
  }

  handleShowAddStudentModal() {
    this.setState((prevState) => ({
      showAddStudentModal: !prevState.showAddStudentModal,
    }));
  }

  handleSaveAddStudent(name, email) {
    this.handleShowAddStudentModal();
    console.log("[Add] save student -> ", name, email);
  }

  render() {
    const { isLoading, students } = this.state;

    return (
      <div className="student">
        <div className="row">
          <div className="col-12">
            <WrapperCard
              header={{
                exist: false,
              }}
            >
              <Card.Body>
                <StudentTable
                  data={{ isLoading, students }}
                  handleAction={(e, id) => this.handleAction(e, id)}
                  handleShowAddStudentModal={this.handleShowAddStudentModal}
                />
                {this.state.showAddStudentModal && (
                  <AddStudentModal
                    isLoading={isLoading}
                    showAddStudentModal={this.state.showAddStudentModal}
                    handleShowAddStudentModal={this.handleShowAddStudentModal}
                    handleSaveAddStudent={this.handleSaveAddStudent}
                  />
                )}
              </Card.Body>
            </WrapperCard>
          </div>
        </div>
      </div>
    );
  }
}

export default Student;
