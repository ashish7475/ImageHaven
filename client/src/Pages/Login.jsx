import React from "react";
import axios from "axios";
import "react-notifications/lib/notifications.css";
import { useNavigate } from "react-router-dom";
import * as Components from "../Components/Components";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const Login = () => {
  const [signIn, toggle] = React.useState(true);
  const [loginFormData, setLoginFormData] = React.useState({
    username: "",
    password: "",
  });
  const [signupFormData, setSignupFormData] = React.useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLoginFormChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSignupFormChange = (e) => {
    setSignupFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (loginFormData.username !== "" && loginFormData.password !== "") {
      const data = await axios.post(
        `${process.env.REACT_APP_URL}login`,
        loginFormData
      );
      if (data.data.status === 200) {
        NotificationManager.success(data.data.message);
        setLoginFormData({ email: "", password: "" });

        sessionStorage.setItem("authToken", data.data.token);
        sessionStorage.setItem("User", JSON.stringify(data.data.user));

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
        // (data);
      } else {
        NotificationManager.error(data.data.message);
      }
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (
      signupFormData.name !== "" &&
      signupFormData.email !== "" &&
      signupFormData.password !== "" &&
      signupFormData.username !== ""
    ) {
      const data = await axios.post(
        `${process.env.REACT_APP_URL}signup`,
        signupFormData
      );
      if (data.data.status == 200) {
        NotificationManager.success(data.data.message);
        setSignupFormData({
          name: "",
          email: "",
          password: "",
          username: "",
        });
        toggle(true);
      } else {
        NotificationManager.error(data.data.message);
      }
    }
  };

  return (
    <div
      className="outer_container"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form onSubmit={handleSignupSubmit}>
            <Components.Title>Create Account</Components.Title>
            <Components.Input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleSignupFormChange}
              value={signupFormData.name}
            />
            <Components.Input
              type="text"
              placeholder="Username"
              name="username"
              value={signupFormData.username}
              onChange={handleSignupFormChange}
            />
            <Components.Input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleSignupFormChange}
              value={signupFormData.email}
            />
            <Components.Input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleSignupFormChange}
              value={signupFormData.password}
            />
            <Components.Button type="submit">Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          <Components.Form onSubmit={handleLoginSubmit}>
            <Components.Title>Sign in</Components.Title>
            <Components.Input
              type="text"
              placeholder="Username"
              name="username"
              value={loginFormData.username}
              onChange={handleLoginFormChange}
            />
            <Components.Input
              type="password"
              placeholder="Password"
              name="password"
              value={loginFormData.password}
              onChange={handleLoginFormChange}
            />
            <Components.Button type="submit">Sign In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter Your personal details and start journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
      <NotificationContainer />
    </div>
  );
};

export default Login;
