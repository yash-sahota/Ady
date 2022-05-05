import React, { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import './landing.css';
import { Container, Row, Col } from 'react-bootstrap';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import axios from 'axios'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Loader from '../Loader/Loader';
import { CAPTCHA_SITE_KEY } from './../../util/configurations';
import ReCAPTCHA from 'react-google-recaptcha';


const ForgetPassword = () => {

    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(true);


    // const cookies = new Cookies();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        window.location.assign("/signin");
    };
    const [user, setUser] = useState({
        email: "",
    });

    const [errMsg, setErrMsg] = useState("")

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    const { email } = user;

    const handleInputChange = e => {
        e.preventDefault()
        setErrMsg("")
        setUser({ ...user, [e.target.name]: e.target.value, msg: "" });
    };

    const [captchaError, setCaptchaError] = useState("");
    const [captchaVerify, setCaptchaVerify] = useState(false);

    const handleRecaptchaChange = (value) => {
        if (value !== null || value !== "") {
            setCaptchaVerify(true);
            setCaptchaError("");
        }
        else {
            setCaptchaVerify(false);
        }
    }

    const handleEmailVerification = async () => {
        if (captchaVerify) {
            var payload = {
                method: 'post',
                mode: 'no-cors',
                data: email,
                url: `/api/account/reset-password/init?accessPlatform=web`,
                headers: {
                    'Content-Type': 'text/plain',
                    'Access-Control-Allow-Origin': '*'
                }
            };
            axios(payload).then(response => {
                if (response.status === 200 || response.status === 201) {
                    handleClickOpen();
                }
            }).catch(err => {
                if (err.response.status === 400) {
                    setErrMsg("Email address not registered.");
                }
            })
        }
        else {
            setCaptchaError("Please verify captcha!")
        }
    }
    return (
        <div>
            {loading && (
                <Loader />
            )}
            <Header />
            <Container id="signin-bg">
                <Row>
                    <Col md={7}></Col>
                    <Col md={5}>
                        <h2 id="signin-title">
                            Forget Your Password
                        </h2>
                        <div className="sign-box">
                            <label style={{ fontSize: 12, color: '#ff9393' }} className="left">{captchaError}</label>
                            <ValidatorForm onSubmit={e => handleEmailVerification(e)}>
                                <p>Please enter your email address<sup>*</sup></p>
                                <TextValidator id="standard-basic" type="text" name="email"
                                    onChange={e => handleInputChange(e)}
                                    value={email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={['This field is required', 'Please provide valid email']}
                                    variant="filled" />
                                    <label style={{ fontSize: 12, color: '#ff9393' }} className="left">{errMsg}</label>
                                <br />
                                <ReCAPTCHA
                                    sitekey={CAPTCHA_SITE_KEY}
                                    onChange={handleRecaptchaChange}
                                />

                                <input className="btn btn-primary sign-btn" type="submit" value="Submit" />
                            </ValidatorForm>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />

            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Email Sent!
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Email has been sent to your email address with a password reset link. Please check your inbox.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <button autoFocus onClick={handleClose} className="btn btn-primary sign-btn" id="close-btn">
                        Ok
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ForgetPassword;
