import { Container, Button, Toast } from "react-bootstrap";
import { useRoom } from "../hooks/useRoom";
import { RoomList } from "../components/room/RoomList";
import { CreateRoomModal } from "../components/room/CreateRoomModal";
import { JoinRoomModal } from "../components/room/JoinRoomModal";

/**
 * Room page component.
 *
 * Displays available collaboration rooms and provides actions to:
 * - Create new rooms
 * - Join existing rooms by ID
 * - Enter rooms from the list
 *
 * This component follows SOLID principles:
 * - Single Responsibility: Only handles page layout and orchestration
 * - Open/Closed: Easily extensible with new room actions
 * - Liskov Substitution: Components are interchangeable with same interface
 * - Interface Segregation: Each child component has focused props
 * - Dependency Inversion: Depends on abstractions (useRoom hook) not implementations
 *
 * Business logic is delegated to useRoom hook, UI components handle their own rendering.
 */
export function Room() {
  const {
    rooms,
    showCreateModal,
    showJoinModal,
    feedback,
    createRoom,
    joinRoom,
    enterRoom,
    setShowCreateModal,
    setShowJoinModal,
    setFeedback,
  } = useRoom();

  return (
    <Container className="py-5">
      {/* Page Title */}
      <h1 className="text-center fw-bold mb-4 text-primary">
        Collaboration Rooms
      </h1>
      <p className="text-center text-muted mb-5">
        Create a new room or join an existing one to start collaborating.
      </p>

      {/* Room Grid */}
      <RoomList rooms={rooms} onEnterRoom={(roomId: string) => enterRoom(roomId)} />

      {/* Floating Action Buttons */}
      <div className="d-flex justify-content-center gap-3 mt-4">
        <Button
          className="rounded-pill px-4"
          variant="success"
          onClick={() => setShowCreateModal(true)}
        >
          ➕ Create Room
        </Button>

        <Button
          className="rounded-pill px-4"
          variant="primary"
          onClick={() => setShowJoinModal(true)}
        >
          🔑 Join Room by ID
        </Button>
      </div>

      {/* Modals */}
      <CreateRoomModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={createRoom}
      />

      <JoinRoomModal
        show={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        onJoin={joinRoom}
      />

      {/* Toast Notifications */}
      {feedback && (
        <Toast
          onClose={() => setFeedback(null)}
          show
          delay={5000}
          autohide
          className={`position-fixed bottom-0 end-0 m-3 bg-${
            feedback.type === "success" ? "success" : "danger"
          } text-white`}
        >
          <Toast.Body>{feedback.message}</Toast.Body>
        </Toast>
      )}
    </Container>
  );
}
