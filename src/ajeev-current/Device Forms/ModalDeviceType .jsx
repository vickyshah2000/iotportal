import React, { useEffect, useState } from "react";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { Link } from "react-router-dom";

import { Row, Col, CardBody, Card, Container, Form, Label, Input, FormFeedback, Button } from "reactstrap";
// import images
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";


const ModalDeviceType = () => {
    const validation = useFormik({
        initialValues: {
            sendingfreq_sec: "",
            positionacuracy_mtr: "",
            protectionrating: "",
            opreatingvoltage_vlt: "",
            hotstart_ses: "",
            warmstart_ses: "",
            coldstart_ses: "",
            humiditylevel_pc: "",
            opreatingtemp_c: "",
            sensitivity_dbm: "",
            activemodepeak_amp: "",
            activemodeavg_mamp: "",
            batterybackup_hrs: "",
            sleepmode_ma: "",
            usbport: "",
            GPSreciver: "",
            GPSaccuracy_m: "",
            protocol: "",
            antenna: "",
            bluetooth: "",
            devicelife: "",
            Model: "",
            battery_mah: "",
            channels: "",
            band2g: "",
            rfpower: "",
            datacoding: "",
            commprotocol: "",
            digitalinput: "",
            digitaloutput: "",
            analoginput: "",
            memory: "",
            firmwareupdate: "",
            sms: "",
            certificates: "",
            sos: "",
        },
        validationSchema: Yup.object({
            sendingfreq_sec: Yup.string(),
            positionacuracy_mtr: Yup.string(),
            protectionrating: Yup.string(),
            opreatingvoltage_vlt: Yup.string(),
            hotstart_ses: Yup.string(),
            warmstart_ses: Yup.string(),
            coldstart_ses: Yup.string(),
            humiditylevel_pc: Yup.string(),
            opreatingtemp_c: Yup.string(),
            sensitivity_dbm: Yup.string(),
            activemodepeak_amp: Yup.string(),
            activemodeavg_mamp: Yup.string(),
            batterybackup_hrs: Yup.string(),
            sleepmode_ma: Yup.string(),
            usbport: Yup.string(),
            GPSreciver: Yup.string(),
            GPSaccuracy_m: Yup.string(),
            protocol: Yup.string(),
            antenna: Yup.string(),
            bluetooth: Yup.string(),
            devicelife: Yup.string(),
            Model: Yup.string(),
            battery_mah: Yup.string(),
            channels: Yup.string(),
            band2g: Yup.string(),
            rfpower: Yup.string(),
            datacoding: Yup.string(),
            commprotocol: Yup.string(),
            digitalinput: Yup.string(),
            digitaloutput: Yup.string(),
            analoginput: Yup.string(),
            memory: Yup.string(),
            firmwareupdate: Yup.string(),
            sms: Yup.string(),
            certificates: Yup.string(),
            sos: Yup.string(),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <React.Fragment>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={8} xl={12}>
                            <Card className="overflow-hidden">
                                <div className="bg-primary bg-soft">
                                    <Row>
                                        <Col className="col-7">
                                            <div className="text-primary p-4">
                                                <h5 className="text-primary">Device Type</h5>
                                            </div>
                                        </Col>
                                        <Col className="col-5 align-self-end">
                                            <img src={profileImg} alt="" className="img-fluid" />
                                        </Col>
                                    </Row>
                                </div>
                                <CardBody className="pt-0">
                                    <div>
                                        <Link to="/">
                                            <div className="avatar-md profile-user-wid mb-4">
                                                <span className="avatar-title rounded-circle bg-light">
                                                    <img src={logoImg} alt="" className="rounded-circle" height="34" />
                                                </span>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="p-2">
                                        <Form
                                            className="form-horizontal"
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                validation.handleSubmit();
                                                return false;
                                            }}
                                        >
                                            <div className="mb-3">
                                                <Row className="mb-3">
                                                    <Col sm={4}>
                                                        <Label className="form-label">Sending Frequency (sec)</Label>
                                                        <Input
                                                            id="sendingfreq_sec"
                                                            name="sendingfreq_sec"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.sendingfreq_sec || ""}
                                                            invalid={validation.touched.sendingfreq_sec && validation.errors.sendingfreq_sec ? true : false}
                                                        />
                                                        {validation.touched.sendingfreq_sec && validation.errors.sendingfreq_sec ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.sendingfreq_sec}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Label className="form-label">Position Accuracy (mtr)</Label>
                                                        <Input
                                                            id="positionaccuracy_mtr"
                                                            name="positionaccuracy_mtr"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.positionaccuracy_mtr || ""}
                                                            invalid={validation.touched.positionaccuracy_mtr && validation.errors.positionaccuracy_mtr ? true : false}
                                                        />
                                                        {validation.touched.positionaccuracy_mtr && validation.errors.positionaccuracy_mtr ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.positionaccuracy_mtr}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Label className="form-label">SOS</Label>
                                                        <Input
                                                            id="sos"
                                                            name="sos"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.sos || ""}
                                                            invalid={validation.touched.sos && validation.errors.sos ? true : false}
                                                        />
                                                        {validation.touched.sos && validation.errors.sos ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.sos}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>

                                                </Row>
                                                <Row className="mb-3">
                                                    <Col sm={4}>
                                                        <Label className="form-label">Protection Rating</Label>
                                                        <Input
                                                            id="protectionrating"
                                                            name="protectionrating"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.protectionrating || ""}
                                                            invalid={validation.touched.protectionrating && validation.errors.protectionrating ? true : false}
                                                        />
                                                        {validation.touched.protectionrating && validation.errors.protectionrating ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.protectionrating}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Label className="form-label">Operating Voltage (Vlt)</Label>
                                                        <Input
                                                            id="opreatingvoltage_vlt"
                                                            name="opreatingvoltage_vlt"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.opreatingvoltage_vlt || ""}
                                                            invalid={validation.touched.opreatingvoltage_vlt && validation.errors.opreatingvoltage_vlt ? true : false}
                                                        />
                                                        {validation.touched.opreatingvoltage_vlt && validation.errors.opreatingvoltage_vlt ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.opreatingvoltage_vlt}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Label className="form-label">Hot Start (ses)</Label>
                                                        <Input
                                                            id="hotstart_ses"
                                                            name="hotstart_ses"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.hotstart_ses || ""}
                                                            invalid={validation.touched.hotstart_ses && validation.errors.hotstart_ses ? true : false}
                                                        />
                                                        {validation.touched.hotstart_ses && validation.errors.hotstart_ses ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.hotstart_ses}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col sm={4}>
                                                        <Label className="form-label">Warm Start (ses)</Label>
                                                        <Input
                                                            id="warmstart_ses"
                                                            name="warmstart_ses"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.warmstart_ses || ""}
                                                            invalid={validation.touched.warmstart_ses && validation.errors.warmstart_ses ? true : false}
                                                        />
                                                        {validation.touched.warmstart_ses && validation.errors.warmstart_ses ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.warmstart_ses}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Label className="form-label">Cold Start (ses)</Label>
                                                        <Input
                                                            id="coldstart_ses"
                                                            name="coldstart_ses"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.coldstart_ses || ""}
                                                            invalid={validation.touched.coldstart_ses && validation.errors.coldstart_ses ? true : false}
                                                        />
                                                        {validation.touched.coldstart_ses && validation.errors.coldstart_ses ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.coldstart_ses}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Label className="form-label">Humidity Level (pc)</Label>
                                                        <Input
                                                            id="humiditylevel_pc"
                                                            name="humiditylevel_pc"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.humiditylevel_pc || ""}
                                                            invalid={validation.touched.humiditylevel_pc && validation.errors.humiditylevel_pc ? true : false}
                                                        />
                                                        {validation.touched.humiditylevel_pc && validation.errors.humiditylevel_pc ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.humiditylevel_pc}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                </Row>

                                                <Row className="mb-3">
                                                    <Col sm={4}>
                                                        <Label className="form-label">Operating Temperature (°C)</Label>
                                                        <Input
                                                            id="opreatingtemp_c"
                                                            name="opreatingtemp_c"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.opreatingtemp_c || ""}
                                                            invalid={validation.touched.opreatingtemp_c && validation.errors.opreatingtemp_c ? true : false}
                                                        />
                                                        {validation.touched.opreatingtemp_c && validation.errors.opreatingtemp_c ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.opreatingtemp_c}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Label className="form-label">Sensitivity (dbm)</Label>
                                                        <Input
                                                            id="sensitivity_dbm"
                                                            name="sensitivity_dbm"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.sensitivity_dbm || ""}
                                                            invalid={validation.touched.sensitivity_dbm && validation.errors.sensitivity_dbm ? true : false}
                                                        />
                                                        {validation.touched.sensitivity_dbm && validation.errors.sensitivity_dbm ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.sensitivity_dbm}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Label className="form-label">Active Mode Peak (amp)</Label>
                                                        <Input
                                                            id="activemodepeak_amp"
                                                            name="activemodepeak_amp"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.activemodepeak_amp || ""}
                                                            invalid={validation.touched.activemodepeak_amp && validation.errors.activemodepeak_amp ? true : false}
                                                        />
                                                        {validation.touched.activemodepeak_amp && validation.errors.activemodepeak_amp ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.activemodepeak_amp}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col sm={4}>
                                                        <Label className="form-label">Active Mode Average (mamp)</Label>
                                                        <Input
                                                            id="activemodeavg_mamp"
                                                            name="activemodeavg_mamp"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.activemodeavg_mamp || ""}
                                                            invalid={validation.touched.activemodeavg_mamp && validation.errors.activemodeavg_mamp ? true : false}
                                                        />
                                                        {validation.touched.activemodeavg_mamp && validation.errors.activemodeavg_mamp ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.activemodeavg_mamp}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Label className="form-label">Battery Backup (hrs)</Label>
                                                        <Input
                                                            id="batterybackup_hrs"
                                                            name="batterybackup_hrs"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.batterybackup_hrs || ""}
                                                            invalid={validation.touched.batterybackup_hrs && validation.errors.batterybackup_hrs ? true : false}
                                                        />
                                                        {validation.touched.batterybackup_hrs && validation.errors.batterybackup_hrs ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.batterybackup_hrs}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Label className="form-label">Sleep Mode (ma)</Label>
                                                        <Input
                                                            id="sleepmode_ma"
                                                            name="sleepmode_ma"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.sleepmode_ma || ""}
                                                            invalid={validation.touched.sleepmode_ma && validation.errors.sleepmode_ma ? true : false}
                                                        />
                                                        {validation.touched.sleepmode_ma && validation.errors.sleepmode_ma ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.sleepmode_ma}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                </Row>

                                                <Row className="mb-3">
                                                    <Col sm={4}>
                                                        <Label className="form-label">USB Port</Label>
                                                        <Input
                                                            id="usbport"
                                                            name="usbport"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.usbport || ""}
                                                            invalid={validation.touched.usbport && validation.errors.usbport ? true : false}
                                                        />
                                                        {validation.touched.usbport && validation.errors.usbport ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.usbport}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Label className="form-label">GPS Receiver</Label>
                                                        <Input
                                                            id="GPSreciver"
                                                            name="GPSreciver"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.GPSreciver || ""}
                                                            invalid={validation.touched.GPSreciver && validation.errors.GPSreciver ? true : false}
                                                        />
                                                        {validation.touched.GPSreciver && validation.errors.GPSreciver ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.GPSreciver}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Label className="form-label">GPS Accuracy (m)</Label>
                                                        <Input
                                                            id="GPSaccuracy_m"
                                                            name="GPSaccuracy_m"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.GPSaccuracy_m || ""}
                                                            invalid={validation.touched.GPSaccuracy_m && validation.errors.GPSaccuracy_m ? true : false}
                                                        />
                                                        {validation.touched.GPSaccuracy_m && validation.errors.GPSaccuracy_m ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.GPSaccuracy_m}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col sm={4}>
                                                        <Label className="form-label">Protocol</Label>
                                                        <Input
                                                            id="protocol"
                                                            name="protocol"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.protocol || ""}
                                                            invalid={validation.touched.protocol && validation.errors.protocol ? true : false}
                                                        />
                                                        {validation.touched.protocol && validation.errors.protocol ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.protocol}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Label className="form-label">Antenna</Label>
                                                        <Input
                                                            id="antenna"
                                                            name="antenna"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.antenna || ""}
                                                            invalid={validation.touched.antenna && validation.errors.antenna ? true : false}
                                                        />
                                                        {validation.touched.antenna && validation.errors.antenna ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.antenna}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Label className="form-label">Bluetooth</Label>
                                                        <Input
                                                            id="bluetooth"
                                                            name="bluetooth"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.bluetooth || ""}
                                                            invalid={validation.touched.bluetooth && validation.errors.bluetooth ? true : false}
                                                        />
                                                        {validation.touched.bluetooth && validation.errors.bluetooth ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.bluetooth}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                </Row>

                                                <Row className="mb-3">
                                                    <Col sm={4}>
                                                        <Label className="form-label">Device Life</Label>
                                                        <Input
                                                            id="devicelife"
                                                            name="devicelife"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.devicelife || ""}
                                                            invalid={validation.touched.devicelife && validation.errors.devicelife ? true : false}
                                                        />
                                                        {validation.touched.devicelife && validation.errors.devicelife ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.devicelife}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Label className="form-label">Model</Label>
                                                        <Input
                                                            id="Model"
                                                            name="Model"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.Model || ""}
                                                            invalid={validation.touched.Model && validation.errors.Model ? true : false}
                                                        />
                                                        {validation.touched.Model && validation.errors.Model ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.Model}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Label className="form-label">Battery Capacity (mAh)</Label>
                                                        <Input
                                                            id="battery_mah"
                                                            name="battery_mah"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.battery_mah || ""}
                                                            invalid={validation.touched.battery_mah && validation.errors.battery_mah ? true : false}
                                                        />
                                                        {validation.touched.battery_mah && validation.errors.battery_mah ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.battery_mah}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col sm={4}>
                                                        <Label className="form-label">Channels</Label>
                                                        <Input
                                                            id="channels"
                                                            name="channels"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.channels || ""}
                                                            invalid={validation.touched.channels && validation.errors.channels ? true : false}
                                                        />
                                                        {validation.touched.channels && validation.errors.channels ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.channels}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Label className="form-label">2G Band</Label>
                                                        <Input
                                                            id="band2g"
                                                            name="band2g"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values["band2g"] || ""}
                                                            invalid={validation.touched["band2g"] && validation.errors["band2g"] ? true : false}
                                                        />
                                                        {validation.touched["band2g"] && validation.errors["band2g"] ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors["band2g"]}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Label className="form-label">RF Power</Label>
                                                        <Input
                                                            id="rfpower"
                                                            name="rfpower"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.rfpower || ""}
                                                            invalid={validation.touched.rfpower && validation.errors.rfpower ? true : false}
                                                        />
                                                        {validation.touched.rfpower && validation.errors.rfpower ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.rfpower}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                </Row>

                                                <Row className="mb-3">
                                                    <Col sm={4}>
                                                        <Label className="form-label">Data Coding</Label>
                                                        <Input
                                                            id="datacoding"
                                                            name="datacoding"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.datacoding || ""}
                                                            invalid={validation.touched.datacoding && validation.errors.datacoding ? true : false}
                                                        />
                                                        {validation.touched.datacoding && validation.errors.datacoding ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.datacoding}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Label className="form-label">Communication Protocol</Label>
                                                        <Input
                                                            id="commprotocol"
                                                            name="commprotocol"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.commprotocol || ""}
                                                            invalid={validation.touched.commprotocol && validation.errors.commprotocol ? true : false}
                                                        />
                                                        {validation.touched.commprotocol && validation.errors.commprotocol ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.commprotocol}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Label className="form-label">Digital Input</Label>
                                                        <Input
                                                            id="digitalinput"
                                                            name="digitalinput"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.digitalinput || ""}
                                                            invalid={validation.touched.digitalinput && validation.errors.digitalinput ? true : false}
                                                        />
                                                        {validation.touched.digitalinput && validation.errors.digitalinput ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.digitalinput}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col sm={4}>
                                                        <Label className="form-label">Digital Output</Label>
                                                        <Input
                                                            id="digitaloutput"
                                                            name="digitaloutput"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.digitaloutput || ""}
                                                            invalid={validation.touched.digitaloutput && validation.errors.digitaloutput ? true : false}
                                                        />
                                                        {validation.touched.digitaloutput && validation.errors.digitaloutput ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.digitaloutput}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Label className="form-label">Analog Input</Label>
                                                        <Input
                                                            id="analoginput"
                                                            name="analoginput"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.analoginput || ""}
                                                            invalid={validation.touched.analoginput && validation.errors.analoginput ? true : false}
                                                        />
                                                        {validation.touched.analoginput && validation.errors.analoginput ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.analoginput}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Label className="form-label">Memory</Label>
                                                        <Input
                                                            id="memory"
                                                            name="memory"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.memory || ""}
                                                            invalid={validation.touched.memory && validation.errors.memory ? true : false}
                                                        />
                                                        {validation.touched.memory && validation.errors.memory ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.memory}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col sm={4}>
                                                        <Label className="form-label">Firmware Update</Label>
                                                        <Input
                                                            id="firmwareupdate"
                                                            name="firmwareupdate"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.firmwareupdate || ""}
                                                            invalid={validation.touched.firmwareupdate && validation.errors.firmwareupdate ? true : false}
                                                        />
                                                        {validation.touched.firmwareupdate && validation.errors.firmwareupdate ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.firmwareupdate}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Label className="form-label">SMS</Label>
                                                        <Input
                                                            id="sms"
                                                            name="sms"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.sms || ""}
                                                            invalid={validation.touched.sms && validation.errors.sms ? true : false}
                                                        />
                                                        {validation.touched.sms && validation.errors.sms ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.sms}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Label className="form-label">Certificates</Label>
                                                        <Input
                                                            id="certificates"
                                                            name="certificates"
                                                            className="form-control"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.certificates || ""}
                                                            invalid={validation.touched.certificates && validation.errors.certificates ? true : false}
                                                        />
                                                        {validation.touched.certificates && validation.errors.certificates ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.certificates}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </Col>
                                                </Row>






                                            </div>
                                            <div className="mt-4 text-center">
                                                <Button className="btn btn-danger btn-block" type="submit">
                                                    Confirm Device
                                                </Button>
                                            </div>
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

export default ModalDeviceType;