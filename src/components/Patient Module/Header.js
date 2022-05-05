import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown, Row, Col } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import logo from "../../images/logo/logo_white.svg";
import "./patient.css";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import profileicon from "../../images/Icons/profile.svg";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import NotificationMenu from "../CommonModule/NotificationMenu";
import { updatePatientTimeZone } from "../../service/frontendapiservices";
import { toast } from "react-toastify";

const Header = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);  

   const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const {
    doctorDetailsList,
    unReadMessageList,
    currentPatient: { picture = null },
  } = props;
  const unReadMessageCount =
    (unReadMessageList && Object.keys(unReadMessageList).length) || 0;
  const pathname = window.location.pathname;
  return (
    <Navbar variant="dark" expand="lg" id="navbar">
      <Container>
        <NavLink to="/patient" className="mr-auto">
          <img
            src={logo}
            id="icon"
            alt="HealthierU Logo"
            style={{ width: "70%" }}
          />
        </NavLink>
        {/* <span className="ml-2 text-light" style={{fontSize: "12px"}}>Hi! &nbsp;{props.currentPatient.firstName}</span> */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle
                            navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {pathname !== "/patient/questionnaire/view" && (
            <>
              <NavLink to="/patient">Home</NavLink>
              <div className="dropdown headerNavbar">
                <button
                  type="button"
                  className="btn dropdown-toggle"
                  data-toggle="dropdown"
                >
                  My Health
                </button>
                <div className="dropdown-menu">
                  <NavLink to="/patient/document" className="dropdown-item">
                    My Records
                  </NavLink>
                  <NavLink
                    to="/patient/myappointment"
                    className="dropdown-item"
                  >
                    My Appointments
                  </NavLink>
                  <NavLink
                    to="/patient/questionnaire/edit"
                    className="dropdown-item"
                  >
                    Health Assessment
                  </NavLink>
                  <NavLink to="/patient/chat" className="dropdown-item">
                    Chat
                  </NavLink>
                </div>
              </div>
              {/* <NavDropdown title="My Health" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/patient/document" style={{ color: '#498ce8' }}><b></b></NavDropdown.Item>
                        <NavDropdown.Item href="/patient/myappointment" style={{ color: '#498ce8' }}><b></b></NavDropdown.Item>
                        <NavDropdown.Item href="/patient/questionnaire/edit" style={{ color: '#498ce8' }}><b></b></NavDropdown.Item>
                        <NavDropdown.Item href="/patient/chat" style={{ color: '#498ce8' }}><b></b></NavDropdown.Item>
                    </NavDropdown> */}
              <NavLink to="/patient/mydoctor">My Doctors</NavLink>
              {/* <NavLink to="/patient/explore">Explore</NavLink> */}
              <NavLink to="/patient/shop">Shop</NavLink>
              {/* <NavLink to="#search">
                        <SearchIcon id="search-icon" />
                    </NavLink>
                    <NavLink to="#search">
                        <MenuIcon />
                    </NavLink> */}
              {unReadMessageCount > 0 && (
                <div className="dropdown headerNavbar notification-Navbar">
                  <IconButton
                    aria-label="show 17 new notifications"
                    color="inherit"
                    type="button"
                    data-toggle="dropdown"
                  >
                    <Badge badgeContent={unReadMessageCount} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <div
                    className="dropdown-menu notification-Menu"
                    style={{ width: "200px" }}
                  >
                    <NotificationMenu
                      unReadMessageList={unReadMessageList}
                      detailsList={doctorDetailsList}
                      module={"patient"}
                    />
                  </div>
                </div>
              )}
            </>
          )}
          <NavLink to="#">
            {picture ? (
              <img
                id="profilePicId"
                width="35"
                src={picture}
                alt=""
                onClick={handleClick}
                className="profile-icon"
              />
            ) : (
              <img
                src={profileicon}
                alt=""
                onClick={handleClick}
                className="profile-icon"
                width="35"
              />
            )}
            {/* (<Avatar onClick={handleClick} name={currentDoctor && (currentDoctor.firstName + " " + currentDoctor.lastName)}  */}
          </NavLink>
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
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Link to="/patient/profile" style={{ textDecoration: "none" }}>
              <MenuItem>Profile</MenuItem>
            </Link>
            <Link
              to="/patient/changepassword"
              style={{ textDecoration: "none" }}
            >
              <MenuItem>Change Password</MenuItem>
            </Link>
            <Link to="/patient/logout" style={{ textDecoration: "none" }}>
              <MenuItem>Logout</MenuItem>
            </Link>
          </Menu>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
