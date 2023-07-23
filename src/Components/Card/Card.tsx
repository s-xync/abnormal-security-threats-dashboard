import React from "react";
import styles from "./Card.module.css";
import PropTypes, { InferProps } from "prop-types";

function Card(props: InferProps<typeof Card.propTypes>) {
  const { title, subHeading, titleColor } = props;
  return (
    <div className={styles.container}>
      <p className={styles.title} style={{ color: titleColor }}>
        {title}
      </p>
      <p className={styles.subHeading}>{subHeading}</p>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  subHeading: PropTypes.string.isRequired,
  titleColor: PropTypes.string.isRequired,
};

export default Card;
