import { Card, Row } from "react-bootstrap";


const AuthContainer = ({ children }) => {
  return (
    <Card
      className="mt-5 mx-auto p-3 px-5 shadow"
      style={{ maxWidth: "400px" }}
    >
      <Card.Body>
        <Row className="mb-2">
          <h5>¡Bienvenidos a Books Champion!</h5>
        </Row>


        {children}
      </Card.Body>
    </Card>
  );
};


export default AuthContainer;