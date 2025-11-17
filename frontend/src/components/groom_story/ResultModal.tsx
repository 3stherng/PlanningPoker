import { Modal } from "react-bootstrap";

export function ResultModal({
  show,
  onClose,
  averageSize,
}: {
  show: boolean;
  onClose: () => void;
  averageSize: string;
}) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Story Size Result</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <h4 className="fw-bold">Average Size: {averageSize}</h4>
      </Modal.Body>
    </Modal>
  );
}
