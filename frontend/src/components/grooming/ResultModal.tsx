import { Modal } from "react-bootstrap";

interface ResultModalProps {
  show: boolean;
  averageSize: string;
  onHide: () => void;
}

export function ResultModal({ show, averageSize, onHide }: ResultModalProps) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Story size result</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <h4 className="fw-bold">Average size: {averageSize}</h4>
      </Modal.Body>
    </Modal>
  );
}
