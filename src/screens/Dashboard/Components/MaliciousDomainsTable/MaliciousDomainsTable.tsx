import React from "react";
import styles from "./MaliciousDomainsTable.module.css";
import PropTypes, { InferProps } from "prop-types";

function MaliciousDomainsTable(
  props: InferProps<typeof MaliciousDomainsTable.propTypes>
) {
  const { topMaliciousDomains } = props;

  return (
    <div className={styles.container}>
      <div>
        <p className={styles.title}>Top 5 Malicious Domains:</p>
        <table>
          <thead>
            <tr className={styles.tableRow}>
              <th className={styles.tableHeaderCell}>Domain</th>
              <th className={styles.tableHeaderCell}>% of threats</th>
              <th className={styles.tableHeaderCell}># of threats</th>
            </tr>
          </thead>
          <tbody>
            {topMaliciousDomains.map((maliciousDomain) => (
              <tr key={maliciousDomain?.domain} className={styles.tableRow}>
                <td className={styles.tableDataCellDomain}>
                  {maliciousDomain?.domain}
                </td>
                <td className={styles.tableDataCell}>
                  {maliciousDomain?.percentage}%
                </td>
                <td className={styles.tableDataCell}>
                  {maliciousDomain?.threats}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

MaliciousDomainsTable.propTypes = {
  topMaliciousDomains: PropTypes.arrayOf(
    PropTypes.shape({
      domain: PropTypes.string.isRequired,
      percentage: PropTypes.number.isRequired,
      threats: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default MaliciousDomainsTable;
