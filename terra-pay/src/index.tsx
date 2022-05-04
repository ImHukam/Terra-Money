import { getChainOptions, WalletProvider } from '@terra-money/wallet-provider';
import { ConnectSample } from 'components/ConnectSample';
import { TxSample } from 'components/TxSample';
import React from 'react';
import ReactDOM from 'react-dom';
// import './style.css';
import './App.css'

function App() {
  return (
    <main className='App-header'
      style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 40 }}
    >
      <ConnectSample />
      <TxSample />
      <div>
        <h3>Past Transactions</h3>
          <p>tx1: 0xx00
            <br />tx2: 
            <br />tx3: 
            <br />tx4: 
            <br />tx5: 
            </p>
      </div>

    </main>
  );
}

getChainOptions().then((chainOptions) => {
  ReactDOM.render(
    <WalletProvider {...chainOptions}>
      <App />
    </WalletProvider>,
    document.getElementById('root'),
  );
});
