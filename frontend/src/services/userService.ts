import { Post } from "../communication";

/**
 * Service layer for user-related API calls.
 *
 * Responsibilities:
 * - Wraps communication.ts HTTP utilities for user operations
 * - Handles user registration and authentication
 * - Provides typed interface for UI layer
 * - Handles error cases consistently
 *
 * This follows the Single Responsibility Principle by focusing
 * only on user data operations, and Dependency Inversion Principle
 * by providing an abstraction over HTTP communication.
 */

export interface UserRegistrationResult {
  success: boolean;
  error?: "Conflict" | "Unknown";
}

export const userService = {
  /**
   * Registers a new user with the specified name.
   *
   * @param name - The username to register
   * @returns Promise resolving to registration result
   * @throws Error if request fails unexpectedly
   */
  async registerUser(name: string): Promise<UserRegistrationResult> {
    const { status, result } = await Post("/user/register", { name });

    if (status) {
      return { success: true };
    }

    if (result?.error === "Conflict") {
      return { success: false, error: "Conflict" };
    }

    return { success: false, error: "Unknown" };
  },
};
