import "./bookDetails.css";

import { useLocation, useNavigate } from "react-router";

import { Badge, Button, Card, Row } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import { useState } from "react";

const BookDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showBookForm, setShowBookForm] = useState(false);
  

  const { title, author, pageCount, summary, imageUrl, rating, available } = location.state.book;

  const clickHandler = () => {
    navigate("/library");
  };

  const ratingStars = Array.from({ length: 5 }, (_, index) =>
    index < rating ? <StarFill key={index} /> : <Star key={index} />
  );


  const handleShowBookForm = () => {
    setShowBookForm(!showBookForm);
  }

  return (
    <Card className="my-3 modify-width">
      <Card.Img
        className="modify-img"
        height={400}
        variant="top"
        src={imageUrl !== "" ? imageUrl : "https://bit.ly/47NylZk"}
      />
      <Card.Body>
        <div className="mb-2">
          {available ?
            <Badge bg="success">Disponible</Badge>
            :
            <Badge bg="danger">Reservado</Badge>
          }
        </div>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>{author}</Card.Subtitle>
        {ratingStars}
        <p>{pageCount} páginas</p>
        <p className="my-3">
          <b>Sinopsis</b>: {summary}
        </p>
        <Row>
          <Button className="me-2 mb-2" variant="secondary" onClick={handleShowBookForm}>
            {showBookForm ? "Ocultar formulario" : "Editar formulario"}
          </Button>
          <Button className="me-2" onClick={clickHandler}>
            Volver a la página principal
          </Button>
        </Row>
      </Card.Body>
    </Card>
  );
};


export default BookDetails;