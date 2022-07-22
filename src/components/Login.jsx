import { useState, useCallback } from "react";
import { useTheme } from "../contexts/ThemeProvider";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { LOGIN_API } from "../config/ajax-path";

function Login() {
    const [formObj, setFormObj] = useState({ account: "", password: "" });
    const { theme, setTheme, themes } = useTheme();
    const changeHandler = useCallback(
        (event) => {
            setFormObj({ ...formObj, [event.target.name]: event.target.value });
        },
        [formObj]
    );
    const submitHandler = useCallback(
        (event) => {
            event.preventDefault();
            (async () => {
                const response = await axios.post(LOGIN_API, formObj);
                const { success, data } = response.data;
                if (success) {
                    localStorage.setItem("auth", JSON.stringify(data));
                }
            })();
        },
        [formObj]
    );
    return (
        <Container className="w-50 mt-5">
            <Form className="border px-5 py-4 rounded-3" onSubmit={(event) => submitHandler(event)} style={theme}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Account</Form.Label>
                    <Form.Control
                        name="account"
                        type="text"
                        placeholder="Account"
                        value={formObj.account}
                        onChange={(event) => changeHandler(event)}
                    />
                    <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formObj.password}
                        onChange={(event) => changeHandler(event)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            {Object.keys(themes).map((style) => (
                <Button onClick={() => setTheme(themes[style])} key={style}>
                    {style}
                </Button>
            ))}
        </Container>
    );
}

export default Login;