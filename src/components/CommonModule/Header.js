import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../images/logo/logo_white.svg';
import './landing.css'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import profileicon from '../../images/Icons/profile.svg';
import LocalStorageService from './../../../src/util/LocalStorageService';
const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const currentuserInfo = LocalStorageService.getCurrentUser();
    const { authorities = [] } = currentuserInfo || {};

    return (
        <Navbar variant="dark" id="navbar">
            <Container>
                <NavLink to="/" className="mr-auto">
                    <img
                        src={logo}
                        id="icon"
                        alt="HealthierU Logo"
                        style={{ width: "70%" }}
                    />
                </NavLink>
                    {/* <span className="ml-2 text-light" style={{fontSize: "12px", width: "100%"}}>Hi! &nbsp;{currentuserInfo.firstName}</span> */}
                <Nav>
                    <NavLink to="#"><img src={profileicon} alt="" onClick={handleClick} className="profile-icon" width="35" /></NavLink>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        // anchorOrigin={{
                        //     vertical: 'bottom',
                        //     horizontal: 'center',
                        // }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        {authorities.length > 0 && authorities.some((user) => user === "ROLE_PATIENT") && (
                            <Link to="/patient/logout" style={{ textDecoration: "none" }}><MenuItem>Logout</MenuItem></Link>
                        )}
                        {authorities.length > 0 && authorities.some((user) => user === "ROLE_DOCTOR") && (
                            <Link to="/doctor/logout" style={{ textDecoration: "none" }}><MenuItem>Logout</MenuItem></Link>
                        )}

                    </Menu>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header
