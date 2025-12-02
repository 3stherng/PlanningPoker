export const Footer = (): JSX.Element => {
  return (
    <footer className="bg-transparent fixed-bottom">
      <div className="container text-end py-3">
        <small className="text-muted">
          © {new Date().getFullYear()}{" "}
          <span className="fw-bold">Planning Poker</span> · All rights reserved
        </small>
      </div>
    </footer>
  );
};
