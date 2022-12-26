import "./Results.css";
import ResultsEntry from "./ResultsEntry/ResultsEntry";

const Results = ({ data }) => {
  return (
    <div id="results-container">
      {data.map(
        (user) =>
          user.withinTime && (
            <ResultsEntry
              key={user.username}
              username={user.username}
              available={user.available}
              remainingTime={user.remainingTime}
            />
          )
      )}
    </div>
  );
};

export default Results;
