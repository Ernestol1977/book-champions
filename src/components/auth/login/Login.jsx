import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import AuthContainer from "../authContainer/AuthContainer";


const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  })

  const navigate = useNavigate()

  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors({ ...errors, email: false });
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors({ ...errors, password: false });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!emailRef.current.value.length) {  // tomado de la referencia
      setErrors({ email: true, password: false })
      alert("Email vacio!");
      emailRef.current.focus();
      setMessage(true);
      return;
    } else if (!password.length || password.length < 7) { // tomado del estado
      setErrors({ email: false, password: true })
      alert("Password incorrecto!")
      passwordRef.current.focus();
      setMessage(true);
      return;
    }

    setErrors({ email: false, password: false });
    setMessage(false);
    alert(`El email ingresado es: ${email} y el password es ${password}`);
    onLogin();
    fetch("http://localhost:3000/login", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(token => {
        localStorage.setItem("book-champions-token", token)
        navigate("/library");
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <AuthContainer>
        <Form onSubmit={handleSubmit}>
          <FormGroup className="mb-4">
            <Form.Control
              type="email"
              placeholder="Ingresar email"
              ref={emailRef}
              onChange={handleEmailChange}
              value={email}
              className={errors.email && "border border-danger border-3"} />
          </FormGroup>
          <FormGroup className="mb-4">
            <Form.Control
              type="password"
              placeholder="Ingresar contraseña"
              ref={passwordRef}
              onChange={handlePasswordChange}
              value={password}
              className={errors.password && "border border-danger border-3"}
            />
          </FormGroup>
          <Row>
            <Col />
            <Col md={6} className="d-flex justify-content-end">
              <Button variant="secondary" type="submit">
                Iniciar sesión
              </Button>
            </Col>
          </Row>
          <Row className="mt-4">
            <p className="text-center fw-bold">Aun no tienes cuenta?</p>
            <Button onClick={() => navigate("/register")}>Registrarse</Button>
          </Row>
        </Form>
      </AuthContainer>
      {message &&
        <p className="fw-bold">Debe completar los campos para iniciar sesión</p>
      }
    </>
  );
};


export default Login;