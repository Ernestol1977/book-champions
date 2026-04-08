import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [menssage, setMenssage] = useState(false);

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  })

  const navigate = useNavigate()
  
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors({ ...errors, email: false })
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
    setErrors({ ...errors, password: false })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!emailRef.current.value.length) {  // tomado de la referencia
      setErrors({ email: true, password: false })
      alert("Email vacio!");
      emailRef.current.focus();
      setMenssage(true);
      return;
    }

    else if (!password.length || password.length < 7) { // tomado del estado
      setErrors({ email: false, password: true })
      alert("Password incorrecto!")
      passwordRef.current.focus();
      setMenssage(true);
      return
    }

    setErrors({ email: false, password: false });
    setMenssage(false);
    alert(`El email ingresado es: ${email} y el password es ${password}`);
    onLogin();
    navigate("/library");
  }

  return (
    <>
      <Card className="mt-5 mx-3 p-3 px-5 shadow">
        <Card.Body>
          <Row className="mb-2">
            <h5>¡Bienvenidos a Books Champion!</h5>
          </Row>
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
          </Form>
        </Card.Body>
      </Card>
      {menssage &&
        <p className="fw-bold">Debe completar los campos para iniciar sesión</p>
      }
    </>
  );
};


export default Login;