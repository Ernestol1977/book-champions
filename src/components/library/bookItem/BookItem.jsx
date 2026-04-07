// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import Badge from 'react-bootstrap/Badge';

import { useState } from "react";
import { Button, Card, Badge } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import MyModal from "../../ui/MyModal";

const BookItem = ({
  id,
  title,
  author,
  rating,
  pageCount,
  imageUrl,
  available,
  onSelectBook,
  onBookDeleted,
}) => {

  const [newTitle, setNewTitle] = useState(title);
  const [showModal, setShowModal] = useState(false);


  const handleClick = () => {
    // setNewTitle(newTitle);
    console.log(newTitle);
    onSelectBook(newTitle);
  }

  const handleConfirmDelete = () => {
    setShowModal(false);
    onBookDeleted(id);
  }

  return (
    <>
      <Card style={{ width: "22rem" }} className="mx-3 mt-3">
        <Card.Img
          height={450}
          variant="top"
          src={
            imageUrl !== ""
              ? imageUrl
              : "https://media.istockphoto.com/id/639812420/es/vector/lanzamiento-exitoso-de-startup.webp?s=2048x2048&w=is&k=20&c=H5k96r1wS-jmyge-ts8fsf_hxgnnCdKy0Dj44OP0EIA="
          }
        />

        <Card.Body>
          <div className="mb-2">
            {available ? (
              <Badge bg="success">Disponible</Badge>
            ) : (
              <Badge bg="danger">Reservado</Badge>
            )}
          </div>

          <Card.Title>{newTitle}</Card.Title>
          <Card.Subtitle>{author}</Card.Subtitle>

          <div>
            {Array.from({ length: 5 }, (_, index) =>
              index < rating ?
                (
                  <StarFill key={index} className="text-warning" />
                ) : (
                  <Star key={index} className="text-warning" />
                )
            )}
          </div>

          <p>{pageCount} páginas</p>

          <div className="d-flex justify-content-around">
            <Button className="bg-warning border-warning text-dark" onClick={() => setShowModal(true)}>
              Eliminar Libro
            </Button>
            <Button onClick={handleClick}>
              Seleccionar Libro
            </Button>
          </div>
        </Card.Body>
      </Card>

      <MyModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default BookItem;
