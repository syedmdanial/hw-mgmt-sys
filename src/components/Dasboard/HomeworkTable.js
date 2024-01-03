import React, { useState } from "react";
import { Table, Dropdown, Form } from "react-bootstrap";

/* common */
import Loading from "../shared/Loading/Loading";
import NoData from "../shared/NoData/NoData";

const HomeworkTable = (props) => {
  const { data } = props;
  const { homework, isLoading } = data;

  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
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
            <button className="btn main-btn float-right">Add Homework</button>
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
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.subject}</td>
                <td>{item.dueDate}</td>
                <td>{item.noOfSubmissions}</td>
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
                      <Dropdown.Item as="span">View Students</Dropdown.Item>
                      <Dropdown.Item as="span">Edit</Dropdown.Item>
                      <Dropdown.Item as="span">Delete</Dropdown.Item>
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
