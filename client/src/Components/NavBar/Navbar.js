import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { BsChatSquare } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "../../Actions/currentUser";
import icon from "../../Assets/icon.png";
import logo from "../../Assets/logo.png";
import search from "../../Assets/search-solid.svg";

import Avatar from "../Avatar/Avatar";
// import Chatbot from "../Chat/Chatbot";
import { sendotp } from "../../Actions/auth";
import ChatBot from "../ChatBot/ChatBot";
import LeftSidebar from "../LeftSidebar/LeftSidebar";
import OtpAuth from "../OtpAuth/OtpAuth";
import "./Navbar.css";

function Navbar() {
  // var name = JSON.parse(localStorage.getItem("Profile"));

  // console.log(name.token);

  // console.log(import.meta.env.VITE_Open_AI_Key);

  const OTP = Math.floor(Math.random() * 8999 + 1000);

  const [Show, setShow] = useState(false);

  // const [Chat, setChat] = useState(false);

  const [BotIsOpen, setBotIsOpen] = useState(false);
  const [otp, setOTP] = useState(Math.floor(Math.random() * 8999 + 1000));
  const [verifyOTP, setVerifyOTP] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // var User = name ? name.result?.name : null;

  var User = useSelector((state) => state.currentUserReducer);

  // console.log(User?.result?.email);

  // console.log(User.result.name);

  // var user = useSelector((state) => state.authReducer).data;

  // var user1 = user.data;

  // const handleChat = () => {
  //   console.log(Chat);
  //   setChat(!Chat);
  // };

  const handleChatBot = () => {
    if (User) {
      setVerifyOTP(false);
      dispatch(sendotp({ email: User?.result?.email, otp }, navigate));
    } else {
      alert("login or signup to ask a question");
      navigate("/auth");
    }
  };

  const getData = (data) => {
    console.log(otp);

    if (data == otp) {
      setVerifyOTP(true);
      setBotIsOpen(!BotIsOpen);
    } else {
      setVerifyOTP(true);
      alert("OTP doesn't matched, try again");
    }
    setOTP(OTP);
  };

  const handleCloseBot = () => {
    setVerifyOTP(true);
    setBotIsOpen(false);
  };

  const handleLeftSidebar = () => {
    // console.log(Show);
    setShow(!Show);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    dispatch(setCurrentUser(null));
  };

  useEffect(() => {
    const token = User?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    // dispatch(signup(JSON.parse(localStorage.getItem("Profile")), navigate));
    // dispatch(login(JSON.parse(localStorage.getItem("Profile")), navigate));
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [User?.token, dispatch]);

  return (
    <>
      <nav className="main-nav">
        <div className="navbar">
          <FontAwesomeIcon
            icon={faBars}
            className="fabar"
            onClick={handleLeftSidebar}
          />

          <Link to="/" className="nav-item nav-logo" id="show">
            <img src={logo} alt="logo" />
          </Link>

          <Link to="/" className="nav-item nav-logo" id="icon">
            <img src={icon} alt="logo" />
          </Link>

          <Link to="/" className="nav-item nav-btn" id="show">
            About
          </Link>

          <Link to="/" className="nav-item nav-btn" id="show">
            Products
          </Link>

          <Link to="/" className="nav-item nav-btn" id="show">
            For Teams
          </Link>

          <form className="show">
            <input type="text" placeholder="Search..." />
            <img src={search} alt="search" width="18" className="search-icon" />
          </form>
          {User === null ? (
            <Link to="/auth" className="nav-item nav-links">
              Log in
            </Link>
          ) : (
            <>
              <Avatar
                backgroundColor="#009dff"
                px="10px"
                py="7px"
                my="7px"
                mx="2px"
                borderRadius="50%"
                color="white"
              >
                <Link
                  to={`/users/${User?.result?._id}`}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  {User?.result.name.charAt(0).toUpperCase()}
                </Link>
              </Avatar>
              <button className="nav-item nav-links" onClick={handleLogout}>
                Log out
              </button>
            </>
          )}
        </div>
      </nav>
      <div className={Show ? "open" : "close"}>
        <LeftSidebar show={handleLeftSidebar} />
      </div>

      {/* <div className={Chat ? "chat" : "unchat"}>
        {Chat ? (
          <Chatbot handleChat={handleChat} />
        ) : (
          <button onClick={handleChat}>
            Chat With Us :-) <FontAwesomeIcon icon={faCommentAlt} />
          </button>
        )}
      </div> */}

      <div className="chatbot-button">
        {BotIsOpen || !verifyOTP ? (
          <div onClick={handleCloseBot}>
            <RxCross1 className="comment-button" />
          </div>
        ) : (
          <div onClick={handleChatBot}>
            <BsChatSquare className="comment-button" />
          </div>
        )}
      </div>

      {BotIsOpen ? <ChatBot setBotIsOpen={setBotIsOpen} /> : ""}
      {!verifyOTP ? (
        <OtpAuth setVerifyOTP={setVerifyOTP} onSubmit={getData} />
      ) : (
        ""
      )}
    </>
  );
}

export default Navbar;
