import { Modal, Form, Button } from "react-bootstrap";

export function EditStoryModal({
  show,
  onClose,
  onConfirm,
  setEditedTitle,
}: {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  setEditedTitle: (val: string) => void;
}) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Story Title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>New Title</Form.Label>
            <Form.Control type="text" placeholder="Enter new title" onChange={(e) => setEditedTitle(e.target.value)} />
          </Form.Group>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onConfirm}>
              Confirm
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
