import "./bookDetails.css";
import { useLocation, useNavigate, useParams } from "react-router";

import { Badge, Button, Card, Row } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import BookForm from "../bookForm/BookForm";

const BookDetails = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [showBookForm, setShowBookForm] = useState(false);
  const [book, setBook] = useState(null);

  useEffect(() => {
    const bookState = {
      ...location.state.book,
      id: parseInt(id, 10),
    };
    setBook(bookState);
  }, [location.state.book, id]);

  const { title, author, pageCount, summary, imageUrl, rating, available } = location.state.book;

  const clickHandler = () => {
    navigate("/library");
  };

  const ratingStars = Array.from({ length: 5 }, (_, index) =>
    index < rating ? <StarFill key={index} /> : <Star key={index} />
  );

  const handleShowBookForm = () => {
    setShowBookForm(!showBookForm);
  };

  const handleBookUpdated = (book) => {
    setBook(book);
  };

  return (
    <>
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
          <Card.Title>{book?.title}</Card.Title>
          <Card.Subtitle>{book?.author}</Card.Subtitle>
          {book?.ratingStars}
          <p>{book?.pageCount} páginas</p>
          <p className="my-3">
            <b>Sinopsis</b>: {book?.summary}
          </p>
          <Row>
            <Button
              className="me-2 mb-2"
              variant="secondary"
              onClick={handleShowBookForm}
            >
              {showBookForm ? "Ocultar formulario" : "Editar libro"}
            </Button>
            <Button
              className="me-2"
              onClick={clickHandler}
            >
              Volver a la página principal
            </Button>
          </Row>
        </Card.Body>
      </Card>
      {showBookForm && (
        <BookForm
          isEditing={true}
          book={book}
          onBookSaved={handleBookUpdated}
        />
      )}
    </>
  );
};


export default BookDetails;