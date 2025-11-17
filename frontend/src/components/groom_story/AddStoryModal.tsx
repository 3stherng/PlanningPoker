import { Modal, Form, Button } from "react-bootstrap";

export function AddStoryModal({
  show,
  onClose,
  onSubmit,
  setTitle,
}: {
  show: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  setTitle: (val: string) => void;
}) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Story</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter story title" onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Confirm
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
