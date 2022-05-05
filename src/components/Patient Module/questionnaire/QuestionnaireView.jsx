import React from 'react';
import '../../questionnaire/Questionnaire.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import {
    saveQuestionAnswer,
} from "../../questionnaire/QuestionAnswerService";
import {
    getQuestionnaireByCategory,
    // rif 
} from "../../questionnaire/QuestionnaireService";
import { getCurrentUserInfo,getCurrentPatientInfo } from "../../../service/AccountService";
import '../patient.css';
import Footer from '../../Login-Module/Footer';
import Header from '../../CommonModule/Header';
import TransparentLoader from '../../Loader/transparentloader';

class QuestionnaireView extends React.Component {

    state = {
        isLoading: true,
        questionnaire: [],
        error: null,
        currentLoggedInUser: null,
        currentPatientUser: null
    };

    constructor() {
        super();
        this.handleCheckBoxEvent = this.handleCheckBoxEvent.bind(this);
    }

    async componentDidMount() {
        // GET request using fetch with async/await
        const response = await getQuestionnaireByCategory("HealthBehaviour");
        if (response) {
            this.setState({ questionnaire: response, isLoading: false });
        }

        const currentUser = await getCurrentUserInfo();
        this.setState({ currentLoggedInUser: currentUser });

        const patientInfo = await getCurrentPatientInfo(currentUser.id, currentUser.login);
        this.setState({ currentPatientUser: patientInfo });

    }

    render() {

        const { isLoading, questionnaire, error, currentPanel
        } = this.state;
        var topicSet = new Set()
        return (
            <div>
                {isLoading && (
                    <TransparentLoader />
                )}
                {/* <Header /> */}
                <Container style={{ maxWidth: "100%" }}>
                    <Row id="questionnaire-view">
                        <Col md={6} id="questionnaire-view-bg"></Col>
                        <Col md={6} style={{ background: "#fff", padding: "5%" }}>
                            <div className="Questionnaire-header">
                                <h1>Health Behaviours</h1>
                                <p> Do You Suffer from Any of the Following?</p>
                            </div>
                            {questionnaire && (
                                questionnaire.map((item, index) =>
                                    item.published ? <div className="row questionnaaire-container" key={index}>
                                        {item.topicSubtopicDetails ?
                                            Object.entries(item.topicSubtopicDetails).map((dataItem, subIndex) => {

                                                //console.log(Object.entries(item.topicSubtopicDetails).length)
                                                topicSet.add(dataItem[0].split("#")[0])

                                                return <div className="col-md-12" key={subIndex}>
                                                    <div className={"Questionnaire-Question-Panel"}>

                                                        <div className="Questionnaire-Heading">
                                                            <h4> {dataItem[0].split("#")[0]}
                                                            </h4>
                                                        </div>


                                                        <div className="Questionnaire-subtopic-Area">
                                                            <b>{dataItem[0].split("#").length > 2 ? dataItem[0].split("#")[1] : ""}</b>
                                                        </div>

                                                        {dataItem[1].map((question, questionSubIndex) => {
                                                            return <div className="Questionnaire-Answer-Area"
                                                                key={questionSubIndex}>

                                                                <div>
                                                                    <div hidden={question.questiontype === 'TEXT'} style={{marginBottom: "8px"}}>
                                                                        <label className="checkbox-container">
                                                                        <input type="checkbox"
                                                                            className="form-radio"
                                                                            onChange={this.handleCheckBoxEvent}
                                                                            id={question.id} />
                                                                           <span class="checkmark"></span>
                                                                        <span id="label_input_6_0">{question.question}</span>
                                                                        </label>
                                                                    </div>

                                                                    <div hidden={question.questiontype === 'BOOLEAN'}>
                                                                        <div className="form-group row">
                                                                            <label htmlFor="description"
                                                                                className="col-sm-12 col-form-label">{question.question}</label>
                                                                            <div className="col-sm-12">
                                                                                <input type="text" className="form-control"
                                                                                    id={question.id}
                                                                                    //placeholder={question.question}
                                                                                    onBlur={this.handleTextBoxEvent}></input>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        })}
                                                    </div>

                                                </div>



                                            }) : <div></div>}


                                    </div> : <div></div>


                                )
                                // If there is a delay in data, let's let the user know it's loading
                            )}


                            <div className="Questionnaire-Area-continue-button">
                                <Button type="submit" variant="primary"
                                    className="Questionnaire-Continue-Button"
                                    onClick={(e) => this.continue(e)}>Continue</Button>
                            </div>

                        </Col>
                    </Row>
                </Container>
                {/* <Footer /> */}

            </div>

        );
    }


    async handleTextBoxEvent(event) {
        //console.log("Event Checkbox ");
        //console.log(event.target.id)
        //console.log(event.target.value)

        var data = {
            "answer": event.target.value,
            "patientId": null,
            "questionId": event.target.id,
            "id": event.target.name === "" ? null : event.target.name
        };

        //console.log(await saveQuestionAnswer(data));
    }


    async handleCheckBoxEvent(event) {
        //console.log("Event Checkbox ");
        //console.log(event.target.checked)
        //console.log(event.target.id)
        //console.log(event)
        const currentUserId = this.state.currentPatientUser.id;
        var data = "";

        if (event.target.name === "") {
            data = {
                "answer": event.target.checked === true ? 'Y' : 'N',
                "patientId": currentUserId,
                "questionId": parseInt(event.target.id),
            };
        } else {
            data = {
                "answer": event.target.checked === true ? 'Y' : 'N',
                "patientId": currentUserId,
                "questionId": parseInt(event.target.id),
                "id": event.target.name === "" ? null : event.target.name
            };
        }

        //console.log(await saveQuestionAnswer(data));
    }




    async continue(event) {
        window.location.assign('/patient');
    }


}

export default QuestionnaireView;