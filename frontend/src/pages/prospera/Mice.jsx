import { Link } from "react-router-dom";

export default function Mice() {
  return (
    <div style={styles.page}>
      <Link to="/prospera" style={styles.back}>← Back to Prospera</Link>
      <h1 style={styles.title}>MICE</h1>
      <p style={styles.text}>
        Meetings, Incentives, Conferences & Exhibitions — full-service
        planning and logistics for corporate travel and business events.
      </p>
      {/* Add corporate offerings or a contact form here */}
    </div>
  );
}

const styles = {
  page: { maxWidth: "900px", margin: "0 auto", padding: "48px 24px" },
  back: { color: "#1a2a6c", fontWeight: 600, textDecoration: "none" },
  title: { color: "#1a2a6c", fontSize: "2rem", marginTop: "16px" },
  text: { color: "#444", fontSize: "1.05rem", lineHeight: 1.6 },
};
