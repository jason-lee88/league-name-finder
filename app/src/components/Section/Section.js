import "./Section.css";

const Section = ({ title, children }) => {
  return (
    <div className="section">
      <div className="section-header">{title}</div>
      {children}
    </div>
  );
};

export default Section;
