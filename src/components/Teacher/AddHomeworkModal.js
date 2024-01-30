import React, { useState, useCallback } from "react";
import WrapperModal from "../shared/Modals/WrapperModal/WrapperModal";
import { TitleOnlyHeader } from "../shared/Modals/Headers/HeaderFunctions";
import { CloseAndActionFooter } from "../shared/Modals/Footers/FooterFunctions";
import { Container, Row, Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

const AddHomeworkModal = (props) => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState({});
  const [file, setFile] = useState({});
  const [fileName, setFileName] = useState(
    "Drag 'n' drop some files here, or click to select files"
  );
  const [dueDate, setDueDate] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setFileName(acceptedFiles[0].name);
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUserInput = (e) => {
    const { value } = e.target;

    if (value.trim() !== "") {
      setTitle(value);
    }
  };

  const handleSelectSubject = (e) => {
    if (e !== null) {
      setSubject(e);
    } else {
      setSubject({});
    }
  };

  const handleSelectDate = (e) => {
    if (e !== null) {
      const date = new Date(e);
      setDueDate(date);
    } else {
      setSubject({});
    }
  };

  const handleSave = () => {
    if (
      title.trim() !== "" &&
      Object.keys(subject).length > 0 &&
      Object.keys(file).length > 0 &&
      dueDate !== null
    ) {
      const data = {
        title,
        subject_id: subject.id,
        file,
        dueDate: dueDate.toISOString(),
      };

      props.handleSaveAddHomework(data);
      props.handleCloseAddHomeworkModal();
    } else {
      toast.error("Field(s) cannot be empty");
    }
  };

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
              handleActionButton: handleSave,
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
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter homework title"
                onChange={(e) => handleUserInput(e)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Select
                options={props.options}
                onChange={(e) => handleSelectSubject(e)}
                placeholder="Select subject"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="file">
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
            <Form.Group controlId="dueDate">
              <Form.Label>Due Date</Form.Label>
              <DatePicker
                selected={dueDate}
                onChange={(e) => handleSelectDate(e)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </WrapperModal>
  );
};

export default AddHomeworkModal;
