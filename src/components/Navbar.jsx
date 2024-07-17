import { ConnectButton } from "@rainbow-me/rainbowkit";

import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={styles.navbar}>
      <h1>Token Indexer</h1>
      <div className={styles.connectButton}>
        <ConnectButton />
      </div>
    </div>
  );
}

export default Navbar;
