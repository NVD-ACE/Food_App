import React from "react";

const NotFoundComponent: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Page Not Found</h1>
      <p style={styles.text}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <a href="/" style={styles.link}>
        Go back to the homepage
      </a>
    </div>
  );
};

// Xác định kiểu cho object styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: "48px",
    color: "#333",
  },
  text: {
    fontSize: "18px",
    color: "#555",
  },
  link: {
    marginTop: "20px",
    fontSize: "18px",
    color: "#007BFF",
    textDecoration: "none",
  },
};

export default NotFoundComponent;
