import "./StatsCard.css";

function StatsCard({ number, title }) {
  return (
    <div className="stats-card">
      <h2>{number}</h2>
      <p>{title}</p>
    </div>
  );
}

export default StatsCard;