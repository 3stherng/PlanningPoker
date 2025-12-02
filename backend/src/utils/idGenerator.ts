// Helper function to generate short hex-like IDs
export function generateId(prefix: string = ""): string {
  const randomHex = () =>
    Math.floor(Math.random() * 16)
      .toString(16)
      .toLowerCase();
  const id = Array.from({ length: 6 }, randomHex).join("");
  return prefix + id;
}
