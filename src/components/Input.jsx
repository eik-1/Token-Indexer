import { useIndexer } from "../context/context";
import styles from "./Input.module.css";

function Input() {
  const { handleAddressChange, queryAddress, getTokenBalance, isValid } =
    useIndexer();

  return (
    <div className={styles.container}>
      <h1>Get all the ERC-20 token balances of this address:</h1>
      <div className={styles.inputContainer}>
        <div className={styles.enter}>
          <input
            className={styles.inputAddress}
            onChange={handleAddressChange}
            value={queryAddress}
            placeholder="Enter an address"
          />
          <button className={styles.btn} onClick={getTokenBalance}>
            Check Balance
          </button>
        </div>
        {queryAddress && (
          <div className={styles.indicator}>
            <p
              className={isValid ? styles.correctAddress : styles.wrongAddress}
            >
              {isValid ? "Valid Ethereum address" : "Invalid Ethereum address"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Input;
