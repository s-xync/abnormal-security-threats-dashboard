import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import TopLevelStats from "./Components/TopLevelStats/TopLevelStats";
import MaliciousDomainsTable from "./Components/MaliciousDomainsTable/MaliciousDomainsTable";

type Attack = {
  id: string;
  attackType: string;
  attackScore: number;
  timestamp: string;
  from: string;
  to: string;
};

type MaliciousDomainDataType = {
  domain: string;
  percentage: number;
  threats: number;
};

function Dashboard() {
  const [threats, setThreats] = useState<Attack[]>([]);
  const [numHighSeverity, setNumHighSeverity] = useState(0);
  const [numSpam, setNumSpam] = useState(0);
  const [topMaliciousDomains, setTopMaliciousDomains] = useState<
    MaliciousDomainDataType[]
  >([]);
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
    calculateStats();
    calculateTopFiveThreats();
  }, [threats]);

  const calculateStats = () => {
    const numHighSeverity = threats.filter(
      (threat) => threat.attackScore > 0.7
    ).length;
    const numSpam = threats.filter(
      (threat) => threat.attackType === "SPAM"
    ).length;
    setNumHighSeverity(numHighSeverity);
    setNumSpam(numSpam);
  };

  const calculateTopFiveThreats = () => {
    const maliciousDomains: { [key: string]: number } = {};
    let totalThreats = 0;

    // Count the number of threats and the total number of threats
    threats.forEach((message) => {
      if (message.attackScore > 0.7) {
        const domain = message.from.split("@")[1];
        if (maliciousDomains[domain]) {
          maliciousDomains[domain]++;
        } else {
          maliciousDomains[domain] = 1;
        }
        totalThreats++;
      }
    });

    // Calculate the percentage of threats for each domain
    const maliciousDomainStats: MaliciousDomainDataType[] = [];
    for (const domain in maliciousDomains) {
      const percentage = (maliciousDomains[domain] / totalThreats) * 100;
      maliciousDomainStats.push({
        domain: domain,
        percentage: Math.round(percentage),
        threats: maliciousDomains[domain],
      });
    }

    // Sort the domains based on the percentage of threats in descending order
    maliciousDomainStats.sort((a, b) => b.threats - a.threats);

    // Get the top 5 malicious domains
    const top5MaliciousDomains = maliciousDomainStats.slice(0, 5);
    setTopMaliciousDomains(top5MaliciousDomains);
  };

  return (
    <div>
      <TopLevelStats numHighSeverity={numHighSeverity} numSpam={numSpam} />
      <MaliciousDomainsTable topMaliciousDomains={topMaliciousDomains} />
    </div>
  );
}

export default Dashboard;
