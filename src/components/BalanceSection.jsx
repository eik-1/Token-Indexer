import { Utils } from "alchemy-sdk";

import styles from "./BalanceSection.module.css";
import Loader from "./Loader";
import { useIndexer } from "../context/context";

function BalanceSection() {
  const { results, tokenDataObjects, isLoading, hasQueried } = useIndexer();

  return (
    <div className={styles.balanceSection}>
      <h2>Balance :</h2>
      {isLoading ? (
        <Loader />
      ) : hasQueried ? (
        <div>
          {results.tokenBalances.map((e, i) => {
            return (
              <div
                flexDir={"column"}
                color="white"
                bg="blue"
                w={"20vw"}
                key={e.id}
              >
                <div>
                  <b>Symbol:</b> ${tokenDataObjects[i].symbol}&nbsp;
                </div>
                <div>
                  <b>Balance:</b>&nbsp;
                  {Utils.formatUnits(
                    e.tokenBalance,
                    tokenDataObjects[i].decimals
                  )}
                </div>
                <img src={tokenDataObjects[i].logo} alt="token_logo" />
              </div>
            );
          })}
        </div>
      ) : (
        "Please make a query! This may take a few seconds..."
      )}
    </div>
  );
}

export default BalanceSection;
