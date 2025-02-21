import PropTypes from "prop-types";
import React from "react";
import {
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  Container,
  FormFeedback,
  Input,
  Label,
  Form,
} from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter, Link } from "react-router-dom";
import newPass from "../../helpers/AuthType/newPass";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { userForgetPassword } from "../../store/actions";

// import images
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.svg";
import { postWithTokenRefresh } from "../../helpers/AuthType/backend";
import changePass from "../../helpers/AuthType/changePass";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const NewPassword = (props) => {
  //meta title
  document.title =
    "Forget Password | Skote - Vite React Admin & Dashboard Template";
  const dispatch = useDispatch();
  const history = useHistory();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      uidb64: "",
      token: "",
      new_password: "",
    },
    validationSchema: Yup.object({
      //   password: Yup.string().required("Please Enter Your Registered Email"),
    }),
    onSubmit: async (values) => {
      const response = await newPass(values);
      console.log(values);
      console.log(response);
      if (response.detail == "Password has been reset successfully") {
        history.push("/login");
      }
      //   changePass(values.email);
    },
  });

  return (
    <React.Fragment>
      <Form
        className="form-horizontal"
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit();
          return false;
        }}
      >
        <div className="mb3">
          <Label className="form-label">UID</Label>
          <Input
            name="uidb64"
            className="form-control"
            placeholder="Enter UID"
            type="text"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.uidb64 || ""}
            invalid={
              validation.touched.email && validation.errors.uidb64
                ? true
                : false
            }
          />
          {validation.touched.uidb64 && validation.errors.uidb64 ? (
            <FormFeedback type="invalid">
              {validation.errors.uidb64}
            </FormFeedback>
          ) : null}
        </div>
        <div className="mb3">
          <Label className="form-label">Token</Label>
          <Input
            name="token"
            className="form-control"
            placeholder="Enter Token"
            type="text"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.token || ""}
            invalid={
              validation.touched.email && validation.errors.token ? true : false
            }
          />
          {validation.touched.token && validation.errors.token ? (
            <FormFeedback type="invalid">
              {validation.errors.token}
            </FormFeedback>
          ) : null}
        </div>
        <div className="mb-3">
          <Label className="form-label">Password</Label>
          <Input
            name="new_password"
            className="form-control"
            placeholder="Enter New Password"
            type="password"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.new_password || ""}
            invalid={
              validation.touched.email && validation.errors.new_password
                ? true
                : false
            }
          />
          {validation.touched.new_password && validation.errors.new_password ? (
            <FormFeedback type="invalid">
              {validation.errors.new_password}
            </FormFeedback>
          ) : null}
        </div>
        <Row className="mb-3">
          <Col className="text-end">
            <button className="btn btn-primary w-md " type="submit">
              Submit
            </button>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};

NewPassword.propTypes = {
  history: PropTypes.object,
};

export default withRouter(NewPassword);
