import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { userService } from "../services/userService";
import { Feedback } from "../types/grooming";

/**
 * State and actions returned by the useAuth hook.
 * Encapsulates all authentication logic for the application.
 */
export interface UseAuthState {
  // Data
  username: string;
  feedback: Feedback | null;
  isAuthenticated: boolean;

  // Actions
  setUsername: (name: string) => void;
  register: (name: string) => Promise<void>;
  setFeedback: (feedback: Feedback | null) => void;
}

/**
 * Custom hook for authentication and user management.
 *
 * Handles:
 * - User registration
 * - Local storage caching of authenticated user
 * - Auto-login from cached credentials
 * - Navigation after successful authentication
 * - User feedback/error messages
 *
 * This follows the Single Responsibility Principle by separating
 * authentication logic from UI presentation, and allows for easier testing.
 *
 * @param redirectPath - The path to redirect to after successful authentication
 * @returns State and action handlers for authentication UI
 *
 * @example
 * ```tsx
 * function Homepage() {
 *   const { username, setUsername, register, feedback } = useAuth("/story");
 *   return <RegistrationForm onSubmit={register} />;
 * }
 * ```
 */
export function useAuth(redirectPath: string = "/story"): UseAuthState {
  const [username, setUsername] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { updateCurrUserName } = useContext(UserContext);
  const navigate = useNavigate();

  /**
   * Checks for cached user credentials on mount and auto-logs in if found.
   */
  useEffect(() => {
    const cachedUser = localStorage.getItem("currUser");
    if (cachedUser) {
      setUsername(cachedUser);
      updateCurrUserName(cachedUser);
      setIsAuthenticated(true);
      navigate(redirectPath);
    }
  }, [updateCurrUserName, navigate, redirectPath]);

  /**
   * Registers a new user and handles all side effects.
   *
   * @param name - The username to register
   */
  const register = useCallback(
    async (name: string) => {
      // Validate input
      if (!name.trim()) {
        setFeedback({
          type: "error",
          message: "Please enter a valid name.",
        });
        return;
      }

      try {
        const result = await userService.registerUser(name);

        if (result.success) {
          // Update state and persist to localStorage
          updateCurrUserName(name);
          localStorage.setItem("currUser", name);
          setIsAuthenticated(true);

          setFeedback({
            type: "success",
            message: "🎉 Successfully registered! Welcome aboard.",
          });

          // Navigate to the app
          navigate(redirectPath);
        } else if (result.error === "Conflict") {
          setFeedback({
            type: "error",
            message: "⚠️ Username already taken. Please choose another.",
          });
        } else {
          setFeedback({
            type: "error",
            message: "⚠️ Something went wrong. Please try again.",
          });
        }
      } catch (error: any) {
        setFeedback({
          type: "error",
          message: error.message ?? "⚠️ An unexpected error occurred.",
        });
      }
    },
    [updateCurrUserName, navigate, redirectPath],
  );

  return {
    username,
    feedback,
    isAuthenticated,
    setUsername,
    register,
    setFeedback,
  };
}
