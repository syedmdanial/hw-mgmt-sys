import React, { useState } from "react";
import WrapperModal from "../../shared/Modals/WrapperModal/WrapperModal";
import { TitleOnlyHeader } from "../../shared/Modals/Headers/HeaderFunctions";
import { CloseAndActionFooter } from "../../shared/Modals/Footers/FooterFunctions";
import { Container, Row, Col, Form } from "react-bootstrap";
import { emailRegex } from "../../../helpers/regex";
import { toast } from "react-toastify";

const AddStudentModal = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleUserInput = (e) => {
    const { id, value } = e.target;

    if (id === "name") {
      setName(value);
    } else if (id === "email") {
      setEmail(value);
    }
  };

  const validateData = () => {
    if (name.trim() === "") toast.error("Name Invalid");

    if (!emailRegex.test(email)) toast.error("Email Invalid");
  };

  const handleSave = () => {
    if (name.trim() !== "" && emailRegex.test(email)) {
      props.handleSaveAddStudent(name, email);
    } else {
      validateData();
    }
  };

  return (
    <WrapperModal
      show={props.showAddStudentModal}
      onClose={props.handleShowAddStudentModal}
      header={{
        exist: true,
        component: (
          <TitleOnlyHeader
            data={{
              title: "Add Student",
              handleCloseModal: props.handleShowAddStudentModal,
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
              handleCloseModal: props.handleShowAddStudentModal,
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
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter student name"
                onChange={(e) => handleUserInput(e)}
                value={name}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter student email"
                onChange={(e) => handleUserInput(e)}
                value={email}
              />
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </WrapperModal>
  );
};

export default AddStudentModal;
