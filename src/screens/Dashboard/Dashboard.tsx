import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import TopLevelStats from "./Components/TopLevelStats/TopLevelStats";

type Attack = {
  id: string;
  attackType: string;
  attackScore: number;
  timestamp: string;
  from: string;
  to: string;
};

function Dashboard() {
  const [threats, setThreats] = useState<Attack[]>([]);
  const [numHighSeverity, setNumHighSeverity] = useState(0);
  const [numSpam, setNumSpam] = useState(0);
  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://abnormalsecurity-public.s3.amazonaws.com/fe_dashboard/adams_keeling/messages.json"
      );
      const data = await response.json();
      setThreats(data);
    })();
  }, []);

  useEffect(() => {
    const numHighSeverity = threats.filter(
      (threat) => threat.attackScore > 0.7
    ).length;
    const numSpam = threats.filter(
      (threat) => threat.attackType === "SPAM"
    ).length;
    setNumHighSeverity(numHighSeverity);
    setNumSpam(numSpam);
  }, [threats]);

  return (
    <div>
      <TopLevelStats numHighSeverity={numHighSeverity} numSpam={numSpam} />
    </div>
  );
}

export default Dashboard;
