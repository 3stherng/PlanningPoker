import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

/**
 * Props for the JoinRoomModal component.
 */
interface JoinRoomModalProps {
  /**
   * Controls whether the modal is visible.
   */
  show: boolean;

  /**
   * Callback invoked when the modal should be closed.
   */
  onClose: () => void;

  /**
   * Callback invoked when user submits a room ID to join.
   * @param roomId - The room ID entered by the user
   */
  onJoin: (roomId: string) => void;
}

/**
 * Modal for joining an existing room by ID.
 *
 * Follows the Single Responsibility Principle by handling only
 * the join room UI and basic validation. Navigation and room
 * validation logic is delegated to the parent (Dependency Inversion).
 *
 * @example
 * ```tsx
 * <JoinRoomModal
 *   show={showModal}
 *   onClose={() => setShowModal(false)}
 *   onJoin={handleJoin}
 * />
 * ```
 */
export function JoinRoomModal({ show, onClose, onJoin }: JoinRoomModalProps) {
  const [roomId, setRoomId] = useState("");

  const handleSubmit = () => {
    if (roomId.trim()) {
      onJoin(roomId);
      setRoomId(""); // Reset form
    }
  };

  const handleClose = () => {
    setRoomId(""); // Reset form
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Join a Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Room ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <Form.Text className="text-muted">
            Paste the room ID you received from a friend or colleague.
          </Form.Text>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Join Room
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
