import { Alert } from "react-bootstrap";
import { Feedback } from "../../types/grooming";

interface FeedbackAlertProps {
  feedback: Feedback | null;
}

/**
 * Reusable feedback alert component for displaying success/error messages.
 * Uses the shared Feedback type from grooming types.
 */
export function FeedbackAlert({ feedback }: FeedbackAlertProps) {
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
