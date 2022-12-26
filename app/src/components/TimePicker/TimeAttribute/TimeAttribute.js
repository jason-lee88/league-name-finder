import "./TimeAttribute.css";

const TimeAttribute = ({ title, setAttribute }) => {
  return (
    <div className="attribute-container">
      <input
        placeholder="0"
        onChange={(e) => {
          if (e.target.value.length > 0) {
            setAttribute(e.target.value);
          } else {
            setAttribute(0);
          }
        }}
        className="attribute-input"
      ></input>
      <div className="attribute-label">{title}</div>
    </div>
  );
};

export default TimeAttribute;
