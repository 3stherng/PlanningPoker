import { Alert } from "react-bootstrap";

export function FeedbackAlert({
  feedback,
}: {
  feedback: { type: "success" | "error"; message: string } | null;
}) {
  if (!feedback) return null;
  return (
    <Alert
      variant={feedback.type === "success" ? "success" : "danger"}
      className="text-center"
    >
      {feedback.message}
    </Alert>
  );
}
