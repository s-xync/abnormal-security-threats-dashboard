import React from "react";
import styles from "./TopLevelStats.module.css";
import Card from "@/Components/Card/Card";
import PropTypes, { InferProps } from "prop-types";

function TopLevelStats(props: InferProps<typeof TopLevelStats.propTypes>) {
  const { numHighSeverity, numSpam } = props;
  return (
    <div className={styles.container}>
      <Card
        title={String(numHighSeverity)}
        subHeading="High Severity Threats"
        titleColor="red"
      />
      <Card
        title={String(numSpam)}
        subHeading="Spam Messages"
        titleColor="orange"
      />
    </div>
  );
}

TopLevelStats.propTypes = {
  numHighSeverity: PropTypes.number.isRequired,
  numSpam: PropTypes.number.isRequired,
};

export default TopLevelStats;
