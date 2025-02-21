import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import PropTypes from "prop-types";
import axios from "axios";
import { postWithTokenRefresh } from "../../helpers/AuthType/backend";

const LoginModal = ({
  isOpen,
  toggle,
  userId,
  userImage,
  firstName,
  lastName,
  entityId,
  mobileNumber,
  alternate_number,
  email,
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const config = { headers: { "Content-Type": "application/json" } };
  const base_url3 = import.meta.env.VITE_BASE_URL3;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await postWithTokenRefresh({
        url: `${base_url3}/api/Login/CreateUser`, body: ({
          userFname: firstName,
          userLname: lastName,
          email: email,
          password: password,
          entity_id: entityId,
          MobileNo: mobileNumber,
          roleId: 4,
        })
      })
      console.log("post done");
      history.push("contact-table", {
        entityId: entityId,
        entityName: entityName,
      });
    } catch (error) {
      console.log(error);
    }
    // Handle form submission logic here
    console.log({
      userFname: firstName,
      userLname: lastName,
      email: email,
      password: password,
      entity_id: entityId,
      mobileNo: mobileNumber,
      roleId: 4,
    });
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Login</ModalHeader>
      <ModalBody>
        <div className="text-center">
          <img
            src={userImage}
            alt="Profile"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
          <h5>
            {firstName} {lastName}
          </h5>
        </div>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="userId">User ID</Label>
            <Input type="text" id="userId" value={userId} readOnly />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  userImage: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};

export default LoginModal;
