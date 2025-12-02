import { ListGroup, Badge, Button } from "react-bootstrap";
import { Player, Vote } from "../../types/grooming";

interface PlayersListProps {
  votes: Vote[];
  players: Player[];
  currentUserId: string | null;
  moderatorId: string | null;
  votesRevealed: boolean;
  onReveal: () => void;
}

export function PlayersList({
  votes,
  players,
  currentUserId,
  moderatorId,
  votesRevealed,
  onReveal,
}: PlayersListProps) {
  // Debug: Log the votes and users data
  console.log("PlayersList DEBUG:", {
    votes,
    players,
    votesRevealed,
    moderatorId,
    currentUserId,
  });

  const getVoteForUser = (userId: string) => {
    const vote = votes.find((v) => v.userId === userId);
    console.log(`Looking for vote for user ${userId}:`, vote);
    return vote;
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="fw-semibold mb-0">Players</h5>
        {moderatorId === currentUserId && (
          <Button
            size="sm"
            variant={votesRevealed ? "secondary" : "primary"}
            onClick={() => onReveal()}
            disabled={votesRevealed}
          >
            {votesRevealed ? "Votes revealed" : "Reveal votes"}
          </Button>
        )}
      </div>

      <ListGroup>
        {players.map((user) => {
          const vote = getVoteForUser(user.id);

          // determine badge content based on reveal state and whether this is the current user
          let badgeText: React.ReactNode = "?";
          if (votesRevealed) {
            badgeText = vote?.size ?? 0;
          } else if (vote && user.id === currentUserId) {
            // always show own vote
            badgeText = vote.size ?? 0;
          } else if (vote) {
            badgeText = "✓";
          } else {
            badgeText = "?";
          }

          console.log(`User ${user.name} (${user.id}):`, {
            hasVote: !!vote,
            voteObject: vote,
            badgeText,
            votesRevealed,
          });

          return (
            <ListGroup.Item
              key={user.id}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <span className="fw-bold me-2">
                  {user.name}
                  {user.id === currentUserId && (
                    <small className="text-muted ms-1">(me)</small>
                  )}
                </span>
              </div>
              <Badge
                bg={
                  votesRevealed || user.id === currentUserId
                    ? "primary"
                    : vote
                      ? "success"
                      : "secondary"
                }
                pill
              >
                {badgeText}
              </Badge>
            </ListGroup.Item>
          );
        })}

        {players.length === 0 && (
          <ListGroup.Item className="text-muted">
            No active players yet.
          </ListGroup.Item>
        )}
      </ListGroup>
    </>
  );
}
