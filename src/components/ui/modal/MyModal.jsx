import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyModal({ show, onClose, onConfirm }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Lectura</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>¿Está seguro de eliminar esta lectura?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal;