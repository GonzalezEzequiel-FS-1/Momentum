import React from "react";
import InputField from "../fields/InputField";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PasswordField from "../fields/PasswordField";
import PropTypes from "prop-types";



const SignIn = ({ email, setEmail, password, setPassword }) => {
    const { user } = useAuth();
    const nav = useNavigate();

    useEffect(() => {
        if (user) {
            nav("/home");
        }
    }, [user]);

    return (
        <form className="w-full flex flex-col gap-5">
            <InputField
                label="Email"
                type="email"
                value={email}
                placeholder="Type your Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordField
                label="Password"
                type="password"
                value={password}
                placeholder="Type your Password"
                onChange={(e) => setPassword(e.target.value)}
            />
        </form>
    );
};

export default SignIn;

SignIn.propTypes = {
    email: PropTypes.string,
    setEmail: PropTypes.func,
    password: PropTypes.string,
    setPassword: PropTypes.func
}