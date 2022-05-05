import React, { useState, useEffect } from 'react'
import Footer from './Footer'
// import QuestionnaireView from './questionnaire/QuestionnaireView'

import './patient.css'
import { Container, Row, Col, Card } from 'react-bootstrap'
import home2 from '../../images/home-2.png'
import home3 from '../../images/home-3.png'
import { Link } from 'react-router-dom'
import Welcome from './../CommonModule/Welcome';
// import LocalStorageService from './../../util/LocalStorageService';
// import CircularProgress from '@material-ui/core/CircularProgress';

import Loader from './../Loader/Loader'
// import { getCurrentUserInfo } from "../../service/AccountService";

// const docprofile = './src/images/doctor/'

const Homepage = ({ currentuserInfo }) => {
    const [loading, setLoading] = useState(true);
    //const [currentUser, setCurrentUser] = useState(currentuserInfo)
    ////console.log("currentuserInfo :::: ", currentuserInfo)

    useEffect(() => {
        if (currentuserInfo) {
            setTimeout(() => setLoading(false), 1000);
        }
    }, [currentuserInfo]);

    // const getCurrentuser = async () => {
    //     const currentUser = await getCurrentUserInfo();
    //     setLoading(false);
    //     setCurrentUser(currentUser)
    // }

    return (<>
        {loading && (
            <Loader />
        )}
        {/* {currentuserInfo && (
            setTimeout(() => setLoading(false), 1000)
        )} */}
        {currentuserInfo && !currentuserInfo.profileCompleted ?
            <Welcome currentuserInfo={currentuserInfo} /> : patientHomePage()
        }
    </>)


}


function patientHomePage() {

    return (
        <div>
            <br />
            <br />
            <Container>
                <Row>
                    <Col md={6}>
                        <Card id="patient-card">
                            <Card.Img variant="top" src={home2} />
                            <Card.Body>
                                <Card.Title>How healthy are you?</Card.Title>
                                <Card.Text>
                                    Find out how you measure with health and<br />
                                    well-being assessment
                                </Card.Text>
                                <Link to="/patient/questionnaire/edit">
                                    <button variant="primary" className="btn btn-outline-light assessment-btn">Take my
                                        assessment
                                    </button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card id="patient-card">
                            <Card.Img variant="top" src={home3} />
                            <Card.Body>
                                <Card.Title>Looking for an expert advise?</Card.Title>
                                <Card.Text>
                                    Check out our available wellness specialists
                                </Card.Text>
                                <Link to="/patient/mydoctor"><button variant="primary" className="btn btn-outline-light assessment-btn">Meet Our Doctors</button></Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <br />
            <br />
            <Container>
                <Row>
                    <Col md={6}>
                        <Link to="/patient/nutrition"><div id="Box1" className="card-box">Nutrition Plan</div></Link>
                    </Col>
                    <Col md={6}>
                        <Link to="/patient/workout"><div id="Box2" className="card-box">Workout</div></Link>
                    </Col>
                    {/*<Col md={4}>
                        <div id="Box3" className="card-box">Lifestyle</div>
                    </Col>*/}
                </Row>
                <br />
                <Row>
                    <Col md={6}>
                        <Link to="/patient/shop"><div id="Box4" className="card-box">Shop</div></Link>
                    </Col>
                    <Col md={6}>
                        <Link to="/patient/article"><div id="Box5" className="card-box">Articles</div></Link>
                    </Col>
                    {/*<Col md={4}>
                        <div id="Box6" className="card-box">Education</div>
                    </Col>*/}
                </Row>
            </Container>
            <br />
            <br />
            {/* <Footer /> */}
        </div>
    )
}
export default Homepage;

