import React, { useState, useEffect } from 'react';
import Navbar from './layout/Navbar';
import './admin.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import SearchBar from "material-ui-search-bar";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Link } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import Avatar from 'react-avatar';
import LocalStorageService from './../../util/LocalStorageService';
import Loader from './../Loader/Loader';
import { commonUtilFunction } from '../../util';
import Cookies from 'universal-cookie';
import { getDoctorBySearch, getPatientBySearch } from './../../service/globalsearchservice';
import {
    getDoctorList,
    getPatientList
} from '../../service/adminbackendservices';

const GlobalSearch = () => {

    const cookies = new Cookies();

    const [users, setUser] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filterData, setFilterData] = useState(users);
    const [filterText, setFilterText] = useState("doctor");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDoctors();
    }, []);

    const loadDoctors = async () => {
        const result = await getDoctorList().catch(err => {
            if (err.response.status === 500 || err.response.status === 504) {
                setLoading(false);
            }
        });
        if (result && result.data) {
            setUser(result.data);
            setFilterData(result.data);
            setTimeout(() => setLoading(false), 1000);
        }
    };
    const loadPatients = async () => {
        const result = await getPatientList().catch(err => {
            if (err.response.status === 500 || err.response.status === 504) {
                setLoading(false);
            }
        });
        if (result && result.data) {
            setUser(result.data);
            setFilterData(result.data);
            setTimeout(() => setLoading(false), 1000);
        }
    };

    const handleSearch = (value) => {
        if (value === "") {
            setFilterData(users);
        }
        else {
            setSearchText(value);
            searchData(value);
        }
    }

    const searchData = async (value) => {
        const lowercasedValue = value.toLowerCase().trim();
        if (filterText === "" || filterText === "doctor") {
            const searchResult = await getDoctorBySearch(lowercasedValue);
            //console.log("searchResult  :::: ", searchResult)
            setFilterData(searchResult);
        }
        else if (filterText === "patient") {
            const searchResult = await getPatientBySearch(lowercasedValue);
            //console.log("searchResult  :::: ", searchResult)
            setFilterData(searchResult);
        }
    }

    const handleFilterClick = (e) => {
        //console.log("value ::::", e.target.value)
        if (e.target.value === "patient") {
            loadPatients();
        } else if (e.target.value === "doctor" || e.target.value === "") {
            loadDoctors();
        }
        setFilterText(e.target.value);
    }

    const setCookies = (authority) => {
        return (authority === "ROLE_DOCTOR" ? cookies.set("authorities", "ROLE_DOCTOR")
            : authority === "ROLE_PATIENT" ? cookies.set("authorities", "ROLE_PATIENT")
                : authority === "ROLE_ADMIN" ? cookies.set("authorities", "ROLE_ADMIN") : 'ROLE_USER')
    }

    return (
        <div>
            {loading && (
                <Loader />
            )}
            <Navbar />
            <br />
            <Container>
                <Row>
                    <Col md={12}>
                        <div id="dorctor-list">
                            <div className="global-Togglebar">
                                <FormControl>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={filterText}
                                        onChange={(e) => handleFilterClick(e)}
                                        displayEmpty={true}
                                    >
                                        <MenuItem value="doctor">Search by Doctor</MenuItem>
                                        <MenuItem value="patient">Search by Patient</MenuItem>
                                    </Select>
                                </FormControl>
                                <SearchBar type="text" value={searchText} id="admin-search" style={{ width: '100% !important' }} onChange={(value) => handleSearch(value)} onCancelSearch={() => handleSearch("")} />
                            </div>
                            <br />
                            <br />

                            {filterText === "doctor" && (
                                <div id="global-list">
                                    <GridList cellHeight={220}>
                                        {filterData && filterData.map((user, index) => (
                                            <GridListTile key={index}>
                                                {user.picture ? (<img src={user.picture} alt="" />)
                                                    : (<Avatar name={user.firstName + " " + user.lastName} />)}
                                                <Link className="btn btn-info text-left"
                                                    to={`/admin/user-management/edit/${user.userId}`}
                                                    onClick={() => setCookies("ROLE_DOCTOR")}>
                                                    <GridListTileBar
                                                        title={<span>Dr. {user.firstName} {user.lastName}</span>}
                                                        subtitle={<ul className="list--tags">{user.specialities &&
                                                            user.specialities.map((speciality, index) => (
                                                                <li key={index}>{speciality.name}</li>
                                                            ))}
                                                        </ul>}
                                                    />
                                                </Link>
                                            </GridListTile>

                                        ))}
                                        {filterData === "" && (
                                            <center><b>No Result Found</b></center>
                                        )}

                                    </GridList>
                                </div>
                            )}
                            {filterText === "patient" && (
                                <div id="global-list">
                                    <GridList cellHeight={220}>
                                        {filterData && filterData.map((user, index) => (
                                            <GridListTile key={index}>
                                                {user.picture ? (<img src={user.picture} alt="" />)
                                                    : (<Avatar name={user.firstName + " " + user.lastName} />)}
                                                <Link className="btn btn-info text-left"
                                                    to={`/admin/user-management/edit/${user.userId}`}
                                                    onClick={() => setCookies("ROLE_PATIENT")}>
                                                    <GridListTileBar
                                                        title={<span>{user.firstName} {user.lastName}</span>}
                                                        subtitle={<><p className="mb-1">Age: {commonUtilFunction.calculate_age(user.dateOfBirth)} yrs</p>
                                                            <p className="mb-1">{user.email}</p></>}
                                                    />
                                                </Link>
                                            </GridListTile>

                                        ))}
                                        {filterData === "" && (
                                            <center><b>No Result Found</b></center>
                                        )}

                                    </GridList>
                                </div>
                            )}

                        </div>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export default GlobalSearch;
