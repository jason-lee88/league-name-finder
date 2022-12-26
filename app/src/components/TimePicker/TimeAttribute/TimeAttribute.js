import "./TimeAttribute.css";

const TimeAttribute = ({ title, setAttribute, defaultVal }) => {
  return (
    <div className="attribute-container">
      <input
        placeholder={defaultVal}
        onChange={(e) => {
          if (e.target.value.length > 0) {
            setAttribute(e.target.value);
          } else {
            setAttribute(defaultVal);
          }
        }}
        className="attribute-input"
      ></input>
      <div className="attribute-label">{title}</div>
    </div>
  );
};

export default TimeAttribute;
