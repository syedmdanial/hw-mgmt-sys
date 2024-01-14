import React, { useState, useCallback } from "react";
import WrapperModal from "../shared/Modals/WrapperModal/WrapperModal";
import { TitleOnlyHeader } from "../shared/Modals/Headers/HeaderFunctions";
import { CloseAndActionFooter } from "../shared/Modals/Footers/FooterFunctions";
import { Container, Row, Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { useDropzone } from "react-dropzone";

const AddHomeworkModal = (props) => {
  const [fileName, setFileName] = useState(
    "Drag 'n' drop some files here, or click to select files"
  );

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setFileName(acceptedFiles[0].name);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <WrapperModal
      show={props.showAddHomeworkModal}
      onClose={props.handleCloseAddHomeworkModal}
      header={{
        exist: true,
        component: (
          <TitleOnlyHeader
            data={{
              title: "Add Homework",
              handleCloseModal: props.handleCloseAddHomeworkModal,
            }}
          />
        ),
      }}
      footer={{
        exist: true,
        component: (
          <CloseAndActionFooter
            data={{
              actionTitle: "Save",
              handleCloseModal: props.handleCloseAddHomeworkModal,
              handleActionButton: props.handleSaveAddHomework,
              isLoading: props.isLoading,
            }}
          />
        ),
      }}
      centered={true}
    >
      <Container>
        <Row>
          <Col>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter your title" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formBasicSubject">
              <Form.Label>Subject</Form.Label>
              <Select options={props.options} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formBasicFile">
              <Form.Label>Upload Homework Document</Form.Label>
              <div className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>{fileName}</p>
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formBasicDueDate">
              <Form.Label>Due Date</Form.Label>
              <DatePicker
                selected={props.startDate}
                onChange={props.handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </WrapperModal>
  );
};

export default AddHomeworkModal;
