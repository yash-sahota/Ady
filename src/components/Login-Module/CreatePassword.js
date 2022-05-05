import React, { useState } from 'react';
import axios from 'axios'
import Header from './Header'
import Footer from './Footer'
import './landing.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
//import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import qs from 'qs';

const isnum = /\d/;
const islow = "(?=.*[a-z])";
const isup = "(?=.*[A-Z])";
// const history = useHistory();

const CreatePassword = () => {
  //let history = useHistory();
  const [open, setOpen] = React.useState(false);
  //const [loading, setLoading] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [user, setUser] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  const [passwordValidity, setpasswordValidity] = useState({
    minchar: false,
    upcase: false,
    lowcase: false,
    num: false
  })
  //useEffect(() => {
  //  setTimeout(() => setLoading(false), 1000);
  //}, []);
  const { newPassword, confirmPassword } = user;
  const { minchar, upcase, lowcase, num } = passwordValidity;

  const handleInputchange = e => {
    e.preventDefault()
    setUser({ ...user, [e.target.name]: e.target.value });
    if (e.target.name === "newPassword") {
      const passvalue = e.target.value;
      setpasswordValidity({
        minchar: passvalue.length >= 8 ? true : false,
        num: passvalue.match(isnum) ? true : false,
        lowcase: passvalue.match(islow) ? true : false,
        upcase: passvalue.match(isup) ? true : false
      })
    }
    else if (e.target.name === "confirmPassword") {
      ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
        if (value !== newPassword) {
          return false;
        }
        else if (value === newPassword) {
          return true;
        }
      });
    }
  };
  const createNewPasswordKey = qs.parse(window.location.search, { ignoreQueryPrefix: true }).resetkey;
  const resetPasswordPayload = {
    key: createNewPasswordKey,
    newPassword: newPassword
  }
  const handleCreatePassword = async () => {
    var payload = {
      method: 'post',
      mode: 'no-cors',
      data: resetPasswordPayload,
      url: `/api/account/reset-password/finish`,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    axios(payload).then(response => {
      if (response.status === 200 || response.status === 201) {
        handleClickOpen();
      }
    })
  }

  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const handleClickShowPassword = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const handleConfirmShowPassword = () => {
    setConfirmPasswordShown(confirmPasswordShown ? false : true);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <Header />
      <Container id="signin-bg">
        <Row>
          <Col md={7}></Col>
          <Col md={5}>
            <h2 id="signin-title">
              Create Password
                            </h2>
            <div className="sign-box">
              <ValidatorForm onError={errors => console.log(errors)} onSubmit={e => handleCreatePassword(e)}>
                <p>New Password<sup>*</sup></p>
                <TextValidator id="standard-basic" type={passwordShown ? "text" : "password"} name="newPassword"
                  onBlur={e => handleInputchange(e)}
                  onChange={e => handleInputchange(e)}
                  value={newPassword}
                  validators={['required', 'matchRegexp:(?=.*[a-z])', 'matchRegexp:(?=.*[A-Z])', 'matchRegexp:(?=.*[0-9])', 'minStringLength:8']}
                  errorMessages={['This field is required', 'Include at least 1 lower case', 'Include at least 1 upper case', 'At least 1 number', 'Minimum of 8 characters']}
                  variant="filled" InputProps={{
                    endAdornment: <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {passwordShown ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }} /><br />

                <p>Confirm Password<sup>*</sup></p>
                <TextValidator id="standard-basic" type={confirmPasswordShown ? "text" : "password"} name="confirmPassword"
                  onBlur={e => handleInputchange(e)}
                  onChange={e => handleInputchange(e)}
                  value={confirmPassword}
                  validators={['isPasswordMatch', 'required']}
                  errorMessages={['Password Does not match', 'This Field is Required']}
                  variant="filled" InputProps={{
                    endAdornment: <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleConfirmShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {confirmPasswordShown ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }} />

                <div className="signup-text left pass-validation">
                  <input type="radio" required checked={minchar} /><span>Minimum of 8 characters</span><br />
                  <input type="radio" required checked={upcase} /><span>Include at least 1 upper case</span><br />
                  <input type="radio" required checked={lowcase} /><span>Include at least 1 lower case</span><br />
                  <input type="radio" required checked={num} /><span>At least 1 number OR 1 special character</span></div>

                <input className="btn btn-primary sign-btn" type="submit" value="Submit" />
              </ValidatorForm>

              <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                  Password Changed Successfully!
        </DialogTitle>
                <DialogContent dividers>
                  <Typography gutterBottom>
                    Your password is changed successfully. Please log in with your new password.
          </Typography>
                </DialogContent>
                <DialogActions>
                  <Link to="/signin"><button autoFocus onClick={handleClose} className="btn btn-primary sign-btn" id="close-btn">
                    Ok
          </button></Link>
                </DialogActions>
              </Dialog>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};
export default CreatePassword;
