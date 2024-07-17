import Navbar from "./components/Navbar";
import Input from "./components/Input";
import BalanceSection from "./components/BalanceSection";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.home}>
      <Navbar />
      <p className={styles.define}>
        Plug in an address or connect to your wallet, to get the list of ERC-20
        Tokens in the account !
      </p>
      <Input />
      <BalanceSection />
    </div>
  );
}

export default App;
