import React, { useState, useEffect } from "react";
import axios from "axios";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {
  //Link, 
  useParams, useHistory
} from "react-router-dom";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Navbar from "../layout/Navbar";
import 'mdbreact/dist/css/mdb.css';
import Loader from '../../Loader/Loader';
import TransparentLoader from '../../Loader/transparentloader';
import LocalStorageService from '../../../util/LocalStorageService';
import Cookies from 'universal-cookie';
import moment from 'moment';
import { Multiselect } from 'multiselect-react-dropdown';
import Select from '@material-ui/core/Select';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
  //Container, 
  Row, Col
} from 'react-bootstrap';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import $ from 'jquery';
//import { checkAccessToken } from '../../../service/RefreshTokenService';
import ImageCropper from '../../CommonModule/ImageCroper';
import {
  getUserByUserId,
  getCountryList,
  getSpecialityList,
  getLanguageList,
  updateRoleDoctor,
  updateRolePatient,
  updateUserData
} from '../../../service/adminbackendservices';
import DoctorDocumentUpload from '../../CommonModule/doctordocumentupload';


$(document).ready(function () {
  $(".upload-button").on('click', function () {
    $(".file-upload").click();
  });
});

const EditUser = (props) => {
  const { selectedId } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [transparentLoading, setTransparentLoading] = useState(false);
  //const [currentUser, setCurrentUser] = useState({});
  const [speciality, setSpeciality] = useState({
    specialityOptions: []
  });
  const { specialityOptions } = speciality;
  const [language, setLanguage] = useState({
    languageOptions: []
  });
  const { languageOptions } = language;
  const [options, Setoption] = useState({
    countryList: []
  });

  const [profilePicture, setProfilePicture] = useState({});

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  }

  const { countryList } = options;
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phone: "",
    countryId: "",
    gender: "",
    email: "",
    rate: 0,
    halfRate: 0,
    education: "",
    specialities: [],
    experience: "",
    languages: [],
    certificates: "",
    awards: "",
    address: "",
    maritalStatus: "",
    lowBp: "",
    highBp: "",
    weight: "",
    height: "",
    langKey: "",
    authorities: []
  });
  const cookies = new Cookies();



  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
    setTransparentLoading(true)
    getCurrentUser();
    loadOptions();
    loadSpeciality();
    loadLanguage();
  }, []);
  const userState = props.location.state;
  const currentUserAuthorities = cookies.get("authorities");
  const authorityName = currentUserAuthorities === "ROLE_DOCTOR" ? 'doctors'
    : currentUserAuthorities === "ROLE_PATIENT" ? 'patients' : '';

  const getCurrentUser = async () => {
    const res = await getUserByUserId(authorityName, selectedId);
    if (res && res.data) {
      if (authorityName === "patients") {
        setUser(res.data[0]);
      }
      else if (authorityName === "doctors") {
        setUser(res.data.doctors[0]);
      }
      setTimeout(() => setTransparentLoading(false), 1000);
    }
  }

  const loadOptions = async () => {
    const res = await getCountryList();
    if (res && res.data) {
      Setoption({ countryList: res.data })
      setTimeout(() => setLoading(false), 1000);
    }
  }
  const loadSpeciality = async () => {
    const res = await getSpecialityList();
    if (res && res.data) {
      setSpeciality({ specialityOptions: res.data })
      setTimeout(() => setLoading(false), 1000);
    }
  }

  const { firstName, lastName, dateOfBirth, phone, countryId, gender, email, education, rate, halfRate,
    //picture, 
    specialities, experience, languages, certificates, awards, address, maritalStatus, lowBp, highBp, weight, height } = user;
  //const onInputChange = e => {
  //setUser({ ...user, [e.target.name]: e.target.value });
  // };

  const handleSpecialities = (selectedList, selectedItem) => {
    // e.preventDefault()
    specialities.push({ id: selectedItem.id });
  };
  const handleLanguages = (selectedList, selectedItem) => {
    // e.preventDefault()
    languages.push({ name: selectedItem.name });
  };
  const loadLanguage = async () => {
    //var getLanguageList = {
    //  method: 'get',
    //  url: `/api/languages`,
    //  headers: {
    //    'Authorization': 'Bearer ' + LocalStorageService.getAccessToken(),
    //    'Content-Type': 'application/json'
    //  }
    //};
    const res = await getLanguageList();
    if (res && res.data) {
      setLanguage({ languageOptions: res.data })
      setTimeout(() => setLoading(false), 1000);
    }
    // .catch(error => {
    //   if (error.response && error.response.status === 401) {
    //     checkAccessToken();
    //   }
    // })
  }

  const removeSpecialities = (selectedList, removedItem) => {
    var array = specialities;
    var index = array.indexOf(removedItem); // Let's say it's Bob.
    array.splice(index, 1);
    setUser({ ...user, specialities: array });
  }
  const removeLanguages = (selectedList, removedItem) => {
    var array = languages;
    var index = array.indexOf(removedItem); // Let's say it's Bob.
    array.splice(index, 1);
    setUser({ ...user, languages: array });
  }
  const handleInputChange = (e) => {
    let value;
    // if ((e.target.name === "rate" || e.target.name === "halfRate") && (e.target.value % 1 !== 0)) {
    //   value = parseFloat(e.target.value).toFixed(2);
    // }
    // else {
    value = e.target.value;
    // }
    setUser({ ...user, [e.target.name]: value });
  };

  const handlePhone = (e) => {
    setUser({ ...user, phone: e });
  };
  const handleCountry = (e) => {
    setUser({ ...user, countryId: e.target.value });
  };

  const handleDateChange = (e) => {
    const d = new Date(e.target.value);
    const isoDate = d.toISOString();
    setUser({ ...user, dateOfBirth: isoDate });
  };

  const handleDetails = async e => {
    setTransparentLoading(true);
    const patientPayload = {
      address: user.address,
      bloodGroup: user.bloodGroup,
      countryId: user.countryId,
      countryName: user.countryName,
      dateOfBirth: user.dateOfBirth,
      email: user.email,
      firstName: user.firstName,
      gender: user.gender,
      height: user.height,
      highBp: user.highBp,
      id: user.id,
      languages: user.languages,
      lastName: user.lastName,
      lowBp: user.lowBp,
      maritalStatus: user.maritalStatus,
      middleName: user.middleName,
      phone: user.phone,
      picture: user.picture,
      userId: user.userId,
      weight: user.weight
    };
    var bodyFormData = new FormData();
    if (currentUserAuthorities === "ROLE_PATIENT") {
      bodyFormData.append('profileData', JSON.stringify(patientPayload))
      const response = await updateRolePatient(bodyFormData).catch(err => {
        if (err.response.status === 500 || err.response.status === 504) {
          setTransparentLoading(false);
        }
      });
      if (response.status === 200 || response.status === 201) {
        // user.login = userState.login;
        // user.langKey = userState.langKey;
        // user.authorities = userState.authorities;
        // const userResponse = await updateUserData(user);
        // if (userResponse) {
          //window.location.assign("/admin");
          history.goBack();
        //}
      }

    }
    if (currentUserAuthorities === "ROLE_DOCTOR") {
      bodyFormData.append('profileData', JSON.stringify(user));
      bodyFormData.append('profilePicture', profilePicture);
      const response = await updateRoleDoctor(bodyFormData).catch(err => {
        if (err.response.status === 500 || err.response.status === 504) {
          setTransparentLoading(false);
        }
      });
      if (response.status === 200 || response.status === 201) {
        // user.login = userState.login;
        // user.langKey = userState.langKey;
        // user.authorities = userState.authorities;
        // const userResponse = await updateUserData(user);
        // if (userResponse) {
          //window.location.assign("/admin");
          history.goBack();
        //}
      }
    }
  }

  const now = new Date();
  const newDate = now.setDate(now.getDate() - 1);
  let maxDate;
  console.log(user)
  const role = cookies.get("authorities")
  if (role === "ROLE_DOCTOR") {
    maxDate = {
      max: moment(newDate).format("YYYY-MM-DD"),
      min: moment(now).subtract(75, "years").format("YYYY-MM-DD")
    };

  }

  if (role === "ROLE_PATIENT") {
    maxDate = {
      max: moment(newDate).format("YYYY-MM-DD"),
      min: moment(now).subtract(100, "years").format("YYYY-MM-DD")
    };
  }

  return (
    <div>
      {loading && (
        <Loader />
      )}
      {transparentLoading && (
        <TransparentLoader />
      )}
      <Navbar pageTitle="home"/>
      <div className="container">
        <button className="btn btn-primary" onClick={() => history.goBack()} >
          Browse Back
      </button>
        <div className="w-75 mx-auto shadow p-5 edit-box">

          <ValidatorForm onSubmit={handleClickOpen}>
            {currentUserAuthorities && currentUserAuthorities === "ROLE_DOCTOR" && (
              <Row style={{ justifyContent: 'center' }}>
                <ImageCropper setProfilePicture={setProfilePicture} imageUrl={user.picture} />
              </Row>)}
            <h2 className="text-center mb-4">Edit {firstName} {lastName}</h2>
            <Row>
              <Col md={6}>
                <p>First Name</p>
                <TextValidator id="standard-basic" type="text" name="firstName"
                  onChange={e => handleInputChange(e)}
                  value={firstName}
                  variant="filled" />
              </Col>
              <Col md={6}>
                <p>Last Name</p>
                <TextValidator id="standard-basic" type="text" name="lastName"
                  onChange={e => handleInputChange(e)}
                  value={lastName}
                  variant="filled" />
              </Col>
            </Row><br />
            <Row>
              <Col md={6}>
                <p>Date of Birth</p>
                <TextValidator id="standard-basic" type="date" name="dateOfBirth" value={moment(dateOfBirth).format("YYYY-MM-DD")} inputProps={maxDate} InputLabelProps={{ shrink: true, }}
                  variant="filled" onChange={e => handleDateChange(e)} onKeyDown={(e) => e.preventDefault()} />
              </Col>
              <Col md={6}>
                <p>Email</p>
                <TextValidator id="standard-basic" type="text" name="email"
                  value={email}
                  disabled
                  variant="filled" />
              </Col>
            </Row>
            <br />
            <Row>
              <Col md={6}>
                <p>Mobile Number</p>
                <PhoneInput
                  inputProps={{
                    name: 'phone',
                    maxLength: 16,
                    minLength: 12
                  }}
                  country={'us'}
                  value={phone}
                  onChange={e => handlePhone(e)}
                  variant="filled"
                />
              </Col>
              <Col md={6}>
                <p>Gender</p>
                <FormControl component="fieldset">
                  <RadioGroup id="gender-radio" aria-label="gender" name="gender"
                    variant="filled" onChange={e => handleInputChange(e)} value={gender}>
                    <FormControlLabel value="FEMALE" control={<Radio color="primary" />} label="Female" />
                    <FormControlLabel value="MALE" control={<Radio color="primary" />} label="Male" />
                    {/* <FormControlLabel value="UNKNOWN" control={<Radio color="primary" />} label="Other" /> */}
                  </RadioGroup>
                </FormControl>
              </Col>
            </Row>
            <br />
            {currentUserAuthorities === "ROLE_DOCTOR" && (<>
              <Row>
                <Col md={6}>
                  <p>Rate for 1hr in $</p>
                  <TextValidator id="standard-basic" type="number" name="rate"
                    onChange={e => handleInputChange(e)}
                    value={rate}
                    inputProps={{
                      min: 0.01,
                      step: 0.01,
                      required: true
                    }}
                    variant="filled" />
                </Col>
                <Col md={6}>
                  <p>Rate for 30min in $</p>
                  <TextValidator id="standard-basic" type="number" name="halfRate"
                    onChange={e => handleInputChange(e)}
                    value={halfRate}
                    inputProps={{
                      min: 0.01,
                      step: 0.01,
                      required: true
                    }}
                    variant="filled" />
                </Col>
              </Row>
              <br />
            </>)}
            <p>Address</p>
            <TextValidator id="standard-basic" type="text" name="address"
              onChange={e => handleInputChange(e)}
              value={address}
              variant="filled" />
            <br />
            {currentUserAuthorities === "ROLE_PATIENT" && (<>
              <Row>
                <Col md={6}>
                  <p>Country Of Residence</p>
                  <FormControl>
                    <Select
                      id="demo-controlled-open-select"
                      variant="filled"
                      name="countryId"
                      value={countryId}
                      displayEmpty
                      onChange={e => handleCountry(e)}
                    >
                      <MenuItem value="">
                        <em>Select</em>
                      </MenuItem>
                      {countryList && countryList.map((option, index) => (
                        <MenuItem value={option.id} key={index}>{option.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Col>
                <Col md={6}>
                  <p>Marital Status</p>
                  <FormControl>
                    <Select
                      id="demo-controlled-open-select"
                      variant="filled"
                      name="maritalStatus"
                      value={maritalStatus}
                      displayEmpty
                      onChange={e => handleInputChange(e)}
                    >
                      <MenuItem value=""><em>Select</em></MenuItem>
                      <MenuItem value="MARRIED">Married</MenuItem>
                      <MenuItem value="SINGLE">Single</MenuItem>
                      <MenuItem value="DIVORCED">Divorced</MenuItem>
                      <MenuItem value="WIDOWED">Widowed</MenuItem>
                      <MenuItem value="OTHER">Other</MenuItem>
                    </Select>
                  </FormControl>

                </Col>
              </Row>
              <br />
              <p>Languages</p>
              <FormControl>
                <div className="multiselect">
                  <Multiselect
                    options={languageOptions}
                    onSelect={handleLanguages}
                    onRemove={removeLanguages}
                    selectedValues={languages}
                    displayValue="name"
                  />
                </div>
              </FormControl>
              <br />
              <br />
              <Row>
                <Col md={6}>
                  <p>Weight(in kg)</p>
                  <TextValidator id="standard-basic" type="number" name="weight"
                    onChange={e => handleInputChange(e)}
                    value={weight}
                    inputProps={{
                      min: 0,
                      max: 999
                    }}
                    variant="filled" />
                </Col>
                <Col md={6}>
                  <p>Height(in cm)</p>
                  <TextValidator id="standard-basic" type="number" name="height"
                    onChange={e => handleInputChange(e)}
                    value={height}
                    inputProps={{
                      min: 0,
                      max: 250
                    }}
                    variant="filled" />
                </Col>
              </Row>
              <br />

              <Row>
                <Col md={6}>
                  <p>High BP(in mmHg)</p>
                  <TextValidator id="standard-basic" type="number" name="highBp"
                    onChange={e => handleInputChange(e)}
                    value={highBp}
                    inputProps={{
                      min: 0,
                      max: 300
                    }}
                    variant="filled" />
                </Col>
                <Col md={6}>
                  <p>Low BP(in mmHg)</p>
                  <TextValidator id="standard-basic" type="number" name="lowBp"
                    onChange={e => handleInputChange(e)}
                    value={lowBp}
                    inputProps={{
                      min: 0,
                      max: 200
                    }}
                    variant="filled" />
                </Col>
              </Row>
              <br />
            </>)}
            {currentUserAuthorities === "ROLE_DOCTOR" && (<>
              <Row>
                <Col md={6}>
                  <p>Country Of Residence</p>
                  <FormControl>
                    <Select
                      id="demo-controlled-open-select"
                      variant="filled"
                      name="countryId"
                      value={countryId}
                      displayEmpty
                      onChange={e => handleCountry(e)}
                    >
                      <MenuItem value="">
                        <em>Select</em>
                      </MenuItem>
                      {countryList && countryList.map((option, index) => (
                        <MenuItem value={option.id} key={index}>{option.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Col>
                <Col md={6}>
                  <p>Languages</p>
                  <FormControl>
                    <div className="multiselect">
                      <Multiselect
                        options={languageOptions}
                        onSelect={handleLanguages}
                        onRemove={removeLanguages}
                        selectedValues={languages}
                        displayValue="name"
                      />
                    </div>
                  </FormControl>

                </Col>
              </Row>
              <br />
              <Row>
                <Col md={6}>
                  <p>Education</p>
                  <TextValidator id="standard-basic" type="text" name="education"
                    onChange={e => handleInputChange(e)}
                    value={education}
                    variant="filled" />

                </Col>
                <Col md={6}>
                  <p>Years Of experience</p>
                  <TextValidator id="standard-basic" type="number" name="experience"
                    onChange={e => handleInputChange(e)}
                    inputProps = {{
                      min: 0,
                      max: 80,
                      step: 0.1
                    }}
                    value={experience}
                    variant="filled" />
                </Col>
              </Row>
              <br />

              <p>Specialization</p>
              <FormControl>
                <div className="multiselect">
                  <Multiselect
                    options={specialityOptions}
                    onSelect={handleSpecialities}
                    onRemove={removeSpecialities}
                    selectedValues={specialities}
                    displayValue="name"
                  />
                </div>
              </FormControl>
              <br />
              <br />

              <p>Other Certifications (optional)</p>
              <TextValidator id="standard-basic" type="text" name="certificates"
                onChange={e => handleInputChange(e)}
                value={certificates}
                variant="filled"
                placeholder="Example: MBBS, MD ..."
                inputProps={{
                  title: "Make it comma (,) separated."
                }} />
              <br />

              <p>Awards (optional)</p>
              <TextValidator id="standard-basic" type="text" name="awards"
                onChange={e => handleInputChange(e)}
                value={awards}
                variant="filled"
                placeholder="Example: People's Doctor of the USA, etc ..."
                inputProps={{
                  title: "Make it comma (,) separated."
                }} />
              <br />
              <DoctorDocumentUpload currentDoctor={user} isDoctor={false} />
            </>)}
            <div className="text-center">
              <button className="btn btn-primary continue-btn" type="submit" >
                Update user
              </button>
            </div>
          </ValidatorForm>
        </div>
      </div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Are you sure to update the data?
        </DialogTitle>
        <DialogActions>
          <button autoFocus onClick={() => handleDetails()} className="btn btn-primary sign-btn">
            Ok
          </button>
          <button autoFocus onClick={handleClose} className="btn btn-primary sign-btn">
            Cancel
          </button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default EditUser;
