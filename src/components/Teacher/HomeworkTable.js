import React, { useState } from "react";
import { Table, Dropdown, Form } from "react-bootstrap";

/* common */
import Loading from "../shared/Loading/Loading";
import NoData from "../shared/NoData/NoData";

const HomeworkTable = (props) => {
  const { data, options } = props;
  const { homework, isLoading } = data;

  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const getSubjectLabel = (id) => {
    let _subject = null;
    _subject = options.find((option) => option.id === id);
    _subject = _subject.label;

    return _subject;
  };

  return (
    <div className="homework-table">
      <div className="my-2">
        <div className="row">
          <div className="col-10">
            <Form.Group controlId="homeworkSearch">
              <Form.Control
                type="text"
                placeholder="Search Homework"
                value={searchText}
                onChange={(e) => handleSearchChange(e)}
              />
            </Form.Group>
          </div>
          <div className="col-2">
            <button
              className="btn main-btn float-right"
              onClick={() => props.handleCloseAddHomeworkModal()}
            >
              Add Homework
            </button>
          </div>
        </div>
      </div>
      <Table striped bordered hover responsive style={{ minHeight: "350px" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Subject</th>
            <th>Due Date</th>
            <th>No of Submission</th>
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
          {!isLoading && homework.length <= 0 && (
            <tr>
              <td colSpan={5}>
                <div className="text-center">
                  <NoData />
                </div>
              </td>
            </tr>
          )}
          {!isLoading &&
            homework.length > 0 &&
            homework.map((item) => (
              <tr key={item._id}>
                {}
                <td>{item.title}</td>
                <td>{getSubjectLabel(item.subject_id)}</td>
                <td>{item.due_date}</td>
                <td>{item.submission}</td>
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
                        id="view-students"
                        onClick={(e) => props.handleAction(e, item)}
                      >
                        View Students
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="span"
                        id="edit-homework"
                        onClick={(e) => props.handleAction(e, item)}
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="span"
                        id="delete-homework"
                        onClick={(e) => props.handleAction(e, item)}
                      >
                        Delete
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

export default HomeworkTable;
