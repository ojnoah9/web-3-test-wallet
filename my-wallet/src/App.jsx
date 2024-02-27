import "./App.css";
import { useState } from "react";
import logo from "./logo2.png";
import { Select } from "antd";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import CreateAccount from "./Components/CreateAccount";
import RecoverAccount from "./Components/RecoverAccount";
import WalletView from "./Components/WalletView";

function App() {
  const [wallet, setWallet] = useState(null);
  const [seedPhrase, setSeedPhrase] = useState(null);
  const [selectedChain, setSelectedChain] = useState("0x1");

  return (
    <div className="App">
      <header>
        <img src={logo} className="headerLogo" alt="logo" />
        <Select
          onChange={(val) => setSelectedChain(val)}
          value={selectedChain}
          options={[
            {
              label: "Ethereum",
              value: "0x1",
            },
            {
              label: "Mumbai Testnet",
              value: "0x13881",
            },

          ]}
          className="dropdown"
        ></Select>
      </header>
      <BrowserRouter>
          <Routes>
            {wallet && seedPhrase ? (
              <Route
                path="/yourwallet"
                element={
                  <WalletView
                    wallet={wallet}
                    setWallet={setWallet}
                    seedPhrase={seedPhrase}
                    setSeedPhrase={setSeedPhrase}
                    selectedChain={selectedChain}
                  />
                }
              />
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route
                  path="/recover"
                  element={
                    <RecoverAccount
                      setSeedPhrase={setSeedPhrase}
                      setWallet={setWallet}
                    />
                  }
                />
                <Route
                  path="/yourwallet"
                  element={
                    <CreateAccount
                      setSeedPhrase={setSeedPhrase}
                      setWallet={setWallet}
                    />
                  }
                />
              </>
            )}
          </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;