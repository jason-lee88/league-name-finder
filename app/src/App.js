import { useEffect, useState } from "react";
import "./App.css";
import Section from "./components/Section/Section";
import TimePicker from "./components/TimePicker/TimePicker";
import Results from "./components/Results/Results";

const App = () => {
  const [years, setYears] = useState(0);
  const [months, setMonths] = useState(0);
  const [days, setDays] = useState(0);
  const [userData, setUserData] = useState();

  const fetchUsernames = async () => {
    const data = await fetch(
      "http://localhost:3001/availability?username=meimei"
    );
    const jsonData = await data.json();
    const newUserData = [];
    newUserData.push(jsonData);
    setUserData(newUserData);
  };

  useEffect(() => {
    const getUsernamesButton = document.getElementById("get-usernames");
    if (!getUsernamesButton) return;

    getUsernamesButton.disabled =
      isNaN(years) ||
      years < 0 ||
      isNaN(months) ||
      months < 0 ||
      isNaN(days) ||
      days < 0
        ? true
        : false;
  }, [years, months, days]);

  return (
    <div id="app-container">
      <div id="header">League of Legends Name Checker</div>
      <div id="header-description">
        Checks LoL usernames which are real English words that will become
        available within the specified timeframe.
      </div>
      <Section title="Time Picker">
        <TimePicker
          setYears={setYears}
          setMonths={setMonths}
          setDays={setDays}
        />
        <button id="get-usernames" onClick={fetchUsernames}>
          Get Usernames
        </button>
      </Section>
      {userData && (
        <Section title="Results">
          <Results data={userData} />
        </Section>
      )}
    </div>
  );
};

export default App;
