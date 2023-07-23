import React, { useState } from "react";
import styles from "./CustomerSelection.module.css";
import PropTypes, { InferProps } from "prop-types";

function CustomerSelection(
  props: InferProps<typeof CustomerSelection.propTypes>
) {
  const { customers, selectedCustomer, setSelectedCustomer } = props;

  const options = ["Option 1", "Option 2", "Option 3"];

  const handleOptionSelect = (e: any) => {
    setSelectedCustomer(e.target.value);
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>Customer:</p>
      <div className={styles.selectOuter}>
        <select
          className={styles.select}
          value={selectedCustomer}
          onChange={handleOptionSelect}
        >
          <option value="Please select" disabled hidden>
            Please select
          </option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

CustomerSelection.propTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  selectedCustomer: PropTypes.string.isRequired,
  setSelectedCustomer: PropTypes.func.isRequired,
};

export default CustomerSelection;
