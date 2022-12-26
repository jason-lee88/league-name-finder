import { useEffect, useState } from "react";
import "./App.css";
import Section from "./components/Section/Section";
import TimePicker from "./components/TimePicker/TimePicker";
import Results from "./components/Results/Results";

const App = () => {
  const [years, setYears] = useState(3);
  const [months, setMonths] = useState(0);
  const [days, setDays] = useState(0);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState();
  const numNames = 20;

  const fetchUsernames = async () => {
    setUserData([]);
    setLoading(true);
    for (let i = 0; i < numNames; i++) {
      const wordRes = await fetch(
        "https://api.api-ninjas.com/v1/randomword?type=noun",
        {
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": process.env.REACT_APP_API_NINJAS_KEY,
          },
        }
      );
      const word = await wordRes.json();
      const data = await fetch(
        `http://localhost:3001/availability?username=${word.word}&years=${years}&months=${months}&days=${days}`
      );
      const jsonData = await data.json();
      setUserData((userData) => [...userData, jsonData]);
    }
    setLoading(false);
  };

  useEffect(() => {
    const getUsernamesButton = document.getElementById("get-usernames");
    if (!getUsernamesButton) return;

    getUsernamesButton.disabled =
      loading ||
      isNaN(years) ||
      years < 0 ||
      isNaN(months) ||
      months < 0 ||
      isNaN(days) ||
      days < 0
        ? true
        : false;
  }, [years, months, days, loading]);

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
          {!loading ? "Get Usernames" : "Loading..."}
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
