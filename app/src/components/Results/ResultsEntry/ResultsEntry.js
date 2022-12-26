import "./ResultsEntry.css";

const ResultsEntry = ({ username, available, remainingTime }) => {
  return (
    <div className="entry-container">
      <div className="field">{username}</div>
      <div className={`field${available ? " available" : ""}`}>
        {available ? "Available now!" : `Available in ${remainingTime}`}
      </div>
    </div>
  );
};

export default ResultsEntry;
