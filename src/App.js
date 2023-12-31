import logo from './logo.svg';
import styles from './App.module.css';
import GameDisplay from './components/GameDisplay/gamedisplay';

function App() {
  return (
    <div>
      <div className={styles["App"]}>
      
      <img src={logo} className={styles["App-logo"]} alt="logo" />
      <h1>Tic-tac-Toe Game</h1>
      
      <GameDisplay />
      
      
    </div>
    <span className={styles["copyright"]}>&copy;2024 Sulaiman Adejumo &middot; Nottingham(UK)</span>

    </div>
  );
}

export default App;
