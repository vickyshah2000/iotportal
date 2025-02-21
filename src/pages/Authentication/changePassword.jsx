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

import { withRouter, Link, useHistory } from "react-router-dom";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
// import { userForgetPassword } from "../../store/actions";

// import images
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.svg";
import Cookies from "js-cookie";
import changePass from "../../helpers/AuthType/changePass";
import { logoutUser } from "../../store/actions";

const ChangePassword = (props) => {
  //meta title
  document.title = "Password Change | SmartPole";
  const dispatch = useDispatch();
  const history = useHistory();

  const loginId = Cookies.get("authUser")
    ? JSON.parse(Cookies.get("authUser")).LoginId
    : "";

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      LoginId: loginId,
      CurrentPwd: "",
      NewPwd: "",
    },
    validationSchema: Yup.object({
      LoginId: Yup.string().required("Please Enter Your login ID"),
    }),
    onSubmit: async (values) => {
      //   dispatch(userForgetPassword(values, props.history));
      console.log(values);
      const response = await changePass(values);
      console.log(response);
      if (response.Result === "1") {
        Cookies.remove("authUser");
        history.push("/login");
        // logoutUser(history);
      }
    },
  });

  const { forgetError, forgetSuccessMsg } = useSelector((state) => ({
    forgetError: state.ForgetPassword.forgetError,
    forgetSuccessMsg: state.ForgetPassword.forgetSuccessMsg,
  }));

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-softbg-soft-primary">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue to Skote.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-4">
                  <div className="p-2">
                    {forgetError && forgetError ? (
                      <Alert color="danger" style={{ marginTop: "13px" }}>
                        {forgetError}
                      </Alert>
                    ) : null}
                    {forgetSuccessMsg ? (
                      <Alert color="success" style={{ marginTop: "13px" }}>
                        {forgetSuccessMsg}
                      </Alert>
                    ) : null}

                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      <div className="mb-3">
                        <Label className="form-label">Login Id</Label>
                        <Input
                          name="LoginId"
                          className="form-control"
                          placeholder="Enter Login Id"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.LoginId || ""}
                          invalid={
                            validation.touched.LoginId &&
                            validation.errors.LoginId
                              ? true
                              : false
                          }
                        />
                        {validation.touched.LoginId &&
                        validation.errors.LoginId ? (
                          <FormFeedback type="invalid">
                            {validation.errors.LoginId}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Current Password</Label>
                        <Input
                          name="CurrentPwd"
                          className="form-control"
                          placeholder="Enter Current Password"
                          type="password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.CurrentPwd || ""}
                          invalid={
                            validation.touched.CurrentPwd &&
                            validation.errors.CurrentPwd
                              ? true
                              : false
                          }
                        />
                        {validation.touched.CurrentPwd &&
                        validation.errors.CurrentPwd ? (
                          <FormFeedback type="invalid">
                            {validation.errors.CurrentPwd}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">New Password</Label>
                        <Input
                          name="NewPwd"
                          className="form-control"
                          placeholder="Enter Login Id"
                          type="password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.NewPwd || ""}
                          invalid={
                            validation.touched.NewPwd &&
                            validation.errors.NewPwd
                              ? true
                              : false
                          }
                        />
                        {validation.touched.NewPwd &&
                        validation.errors.NewPwd ? (
                          <FormFeedback type="invalid">
                            {validation.errors.NewPwd}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <Row className="mb-3">
                        <Col className="text-center">
                          <button
                            className="btn btn-primary w-md "
                            type="submit"
                          >
                            Submit
                          </button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

ChangePassword.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ChangePassword);
