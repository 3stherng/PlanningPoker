import { ListGroup, Badge } from "react-bootstrap";

interface PlayersListProps {
  allVotes: any[];
  allUsers: any[];
}

export function PlayersList({ allVotes, allUsers }: PlayersListProps) {
  const getVoteForUser = (userId: number) => {
    return allVotes.find((v) => v.user_id === userId);
  };

  return (
    <>
      <h5 className="fw-semibold mb-3">Players</h5>
      <ListGroup>
        {allUsers.map((user) => {
          const vote = getVoteForUser(user.id);
          return (
            <ListGroup.Item
              key={user.id}
              className="d-flex justify-content-between align-items-center"
            >
              <span className="fw-bold">{user.name}</span>
              <Badge bg={vote ? "primary" : "secondary"} pill>
                {vote?.size ?? "?"}
              </Badge>
            </ListGroup.Item>
          );
        })}
        {allUsers.length === 0 && (
          <ListGroup.Item className="text-muted">
            No active players yet.
          </ListGroup.Item>
        )}
      </ListGroup>
    </>
  );
}
