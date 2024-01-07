import React, { useState } from "react";
import { Table, Dropdown, Form } from "react-bootstrap";

/* common */
import Loading from "../../shared/Loading/Loading";
import NoData from "../../shared/NoData/NoData";

const StudentTable = (props) => {
  const { data } = props;
  const { students, isLoading } = data;

  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="homework-table">
      <div className="my-2">
        <div className="row">
          <div className="col-10">
            <Form.Group controlId="studentSearch">
              <Form.Control
                type="text"
                placeholder="Search Student"
                value={searchText}
                onChange={(e) => handleSearchChange(e)}
              />
            </Form.Group>
          </div>
          <div className="col-2">
            <button
              className="btn main-btn float-right"
              onClick={() => props.handleShowAddStudentModal()}
            >
              Add Student
            </button>
          </div>
        </div>
      </div>
      <Table striped bordered hover responsive style={{ minHeight: "350px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Invited Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={5}>
                <div className="text-center">
                  <Loading />
                </div>
              </td>
            </tr>
          )}
          {!isLoading && students.length <= 0 && (
            <tr>
              <td colSpan={5}>
                <div className="text-center">
                  <NoData />
                </div>
              </td>
            </tr>
          )}
          {!isLoading &&
            students.length > 0 &&
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.invitedDate}</td>
                <td>{student.status}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle
                      as="button"
                      id="homework-table-action"
                      className="btn main-btn"
                    >
                      Actions
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as="span"
                        id="send-invitation"
                        onClick={(e) => props.handleAction(e, student)}
                      >
                        Send Invitation
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="span"
                        id="Delete"
                        onClick={(e) => props.handleAction(e, student)}
                      >
                        Delete
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="span"
                        id="download-homework"
                        onClick={(e) => props.handleAction(e, student)}
                      >
                        Download Homework
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentTable;
