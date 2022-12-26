import "./TimePicker.css";
import TimeAttribute from "./TimeAttribute/TimeAttribute";

const TimePicker = ({ setYears, setMonths, setDays }) => {
  return (
    <div id="timepicker-container">
      <TimeAttribute title="Years" setAttribute={setYears} />
      <TimeAttribute title="Months" setAttribute={setMonths} />
      <TimeAttribute title="Days" setAttribute={setDays} />
    </div>
  );
};

export default TimePicker;
