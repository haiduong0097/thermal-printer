import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState } from "react";
import AlertMessage from "../layout/alert-message";
import { registerUser } from "../../config/_action";
import { FormControlElement } from "../../utils/type";
import { DEFAULT_DELAY } from "../../utils/constant";
import { useDispatch } from "react-redux";

const RegisterForm = () => {
  const dispatch = useDispatch();
  // Local state
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] =
    useState<{ type: string; message: string } | null>(null);

  const { username, password, confirmPassword } = registerForm;

  const onChangeRegisterForm = (event: React.ChangeEvent<FormControlElement>) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const hanldeRegister = async (event: any) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Passwords do not match" });
      setTimeout(() => setAlert(null), DEFAULT_DELAY);
      return;
    }
    try {
      const loginData = await registerUser(dispatch, registerForm);
      if (!loginData.success) {
        setAlert({ type: "danger", message: loginData.message });
        setTimeout(() => setAlert(null), DEFAULT_DELAY);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit={hanldeRegister}>
        <AlertMessage info={alert} />

        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
      <p>
        Already have an account?
        <Link to="login">
          <Button variant="info" size="sm" className="ml-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
