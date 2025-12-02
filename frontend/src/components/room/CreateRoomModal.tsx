import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

/**
 * Props for the CreateRoomModal component.
 */
interface CreateRoomModalProps {
  /**
   * Controls whether the modal is visible.
   */
  show: boolean;

  /**
   * Callback invoked when the modal should be closed.
   */
  onClose: () => void;

  /**
   * Callback invoked when user submits a new room name.
   * @param roomName - The name entered by the user
   */
  onCreate: (roomName: string) => void;
}

/**
 * Modal for creating a new collaboration room.
 *
 * Follows the Single Responsibility Principle by handling only
 * the room creation UI and validation. Business logic is delegated
 * to the parent component or hook (Dependency Inversion Principle).
 *
 * @example
 * ```tsx
 * <CreateRoomModal
 *   show={showModal}
 *   onClose={() => setShowModal(false)}
 *   onCreate={handleCreate}
 * />
 * ```
 */
export function CreateRoomModal({
  show,
  onClose,
  onCreate,
}: CreateRoomModalProps) {
  const [roomName, setRoomName] = useState("");

  const handleSubmit = () => {
    onCreate(roomName);
    setRoomName(""); // Reset form
  };

  const handleClose = () => {
    setRoomName(""); // Reset form
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create a New Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Room Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <Form.Text className="text-muted">
            Choose a unique name for your room.
          </Form.Text>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Create Room
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
