import { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { Feedback } from "../../types/grooming";

interface FeedbackAlertProps {
  feedback: Feedback | null;
  onDismiss?: () => void;
  autoHideDuration?: number;
}

/**
 * Reusable feedback toast notification component for displaying success/error messages.
 * Uses the shared Feedback type from grooming types.
 * Auto-dismisses after 2 seconds by default.
 * Appears as a toast notification in the bottom-right corner (like Teams/email notifications).
 */
export function FeedbackAlert({
  feedback,
  onDismiss,
  autoHideDuration = 2000,
}: FeedbackAlertProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (feedback) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [feedback]);

  const handleClose = () => {
    setShow(false);
    if (onDismiss) {
      setTimeout(() => onDismiss(), 150); // Small delay to allow animation
    }
  };

  if (!feedback) return null;

  return (
    <ToastContainer
      position="bottom-end"
      className="p-3"
      style={{ position: "fixed", zIndex: 9999 }}
    >
      <Toast
        show={show}
        onClose={handleClose}
        delay={autoHideDuration}
        autohide
        bg={feedback.type === "success" ? "success" : "danger"}
      >
        <Toast.Header>
          <strong className="me-auto">
            {feedback.message}
          </strong>
        </Toast.Header>
      </Toast>
    </ToastContainer>
  );
}
