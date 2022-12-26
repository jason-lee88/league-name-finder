import "./TimePicker.css";
import TimeAttribute from "./TimeAttribute/TimeAttribute";

const TimePicker = ({ setYears, setMonths, setDays }) => {
  return (
    <div id="timepicker-container">
      <TimeAttribute title="Years" setAttribute={setYears} defaultVal={3} />
      <TimeAttribute title="Months" setAttribute={setMonths} defaultVal={0} />
      <TimeAttribute title="Days" setAttribute={setDays} defaultVal={0} />
    </div>
  );
};

export default TimePicker;
