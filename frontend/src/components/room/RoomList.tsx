import { Row, Col } from "react-bootstrap";
import { Room } from "../../types/storyManagement";
import { RoomCard } from "./RoomCard";

/**
 * Props for the RoomList component.
 */
interface RoomListProps {
  /**
   * Array of rooms to display.
   */
  rooms: Room[];

  /**
   * Callback invoked when user clicks to enter a room.
   */
  onEnterRoom: (roomId: string) => void;

  /**
   * Optional message to display when no rooms are available.
   */
  emptyMessage?: string;
}

/**
 * Displays a grid of room cards or an empty state message.
 *
 * Follows the Single Responsibility Principle by handling only
 * the rendering of the room list. Delegates individual room
 * rendering to RoomCard components (Open/Closed Principle).
 *
 * @example
 * ```tsx
 * <RoomList
 *   rooms={rooms}
 *   onEnterRoom={handleEnter}
 *   emptyMessage="No rooms available yet."
 * />
 * ```
 */
export function RoomList({
  rooms,
  onEnterRoom,
  emptyMessage = "No rooms available yet. Create one below!",
}: RoomListProps) {
  // Defensive check: ensure rooms is an array
  const roomList = Array.isArray(rooms) ? rooms : [];

  if (roomList.length === 0) {
    return (
      <Row>
        <Col>
          <p className="text-muted text-center">{emptyMessage}</p>
        </Col>
      </Row>
    );
  }

  return (
    <Row>
      {roomList.map((room) => (
        <Col md={6} key={room.id} className="mb-4">
          <RoomCard room={room} onEnter={(id: string) => onEnterRoom(id)} />
        </Col>
      ))}
    </Row>
  );
}
