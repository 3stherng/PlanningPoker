export const Footer = () => {
  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "transparent",
        color: "#000000",
        textAlign: "right",
        padding: "1rem 2rem",
      }}
    >
      <small>
        © {new Date().getFullYear()}{" "}
        <span style={{ fontWeight: "bold" }}>Planning Poker</span> · All rights
        reserved
      </small>
    </footer>
  );
};
