import { Utils } from "alchemy-sdk";
import styles from "./BalanceSection.module.css";
import Loader from "./Loader";
import { useIndexer } from "../context/context";

function BalanceSection() {
  const { results, tokenDataObjects, isLoading, hasQueried } = useIndexer();

  const formatBalance = (balance, decimals) => {
    const formatted = Utils.formatUnits(balance, decimals);
    return parseFloat(formatted).toFixed(4);
  };

  return (
    <div className={styles.balanceSection}>
      <h2>Balance:</h2>
      {isLoading ? (
        <Loader />
      ) : hasQueried ? (
        <div className={styles.tokenGrid}>
          {results.tokenBalances.map((e, i) => {
            const balance = formatBalance(
              e.tokenBalance,
              tokenDataObjects[i].decimals
            );
            const fullBalance = Utils.formatUnits(
              e.tokenBalance,
              tokenDataObjects[i].decimals
            );

            return (
              <div key={e.id} className={styles.tokenCard}>
                <img
                  src={tokenDataObjects[i].logo || "/placeholder_token.jpg"}
                  alt={`${tokenDataObjects[i].symbol} logo`}
                  className={styles.tokenLogo}
                />
                <div className={styles.tokenSymbol}>
                  ${tokenDataObjects[i].symbol}
                </div>
                <div className={`${styles.tokenBalance} ${styles.tooltip}`}>
                  Balance: {balance}
                  <span className={styles.tooltipText}>{fullBalance}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Please make a query! This may take a few seconds...</p>
      )}
    </div>
  );
}

export default BalanceSection;
