import { useState } from 'react';
import { generateMnemonic } from 'bip39';
import { SolanaWallet } from './components/SolanaWallet';
import { EthWallet } from './components/EthereumWallet';

const App = () => {
  const [mnemonic, setMnemonic] = useState('');

  return (
    <div className='container'>
      <h1>Web3 Wallet Generator</h1>

      <input
        type='text'
        value={mnemonic}
        readOnly
        placeholder='Your seed phrase will appear here...'
      />

      <button
        onClick={async () => {
          const mn = await generateMnemonic();
          setMnemonic(mn);
        }}
      >
        Create Seed Phrase
      </button>

      {mnemonic && (
        <>
          <div className='wallet'>
            <h3>Solana Wallet</h3>
            <SolanaWallet mnemonic={mnemonic} />
          </div>

          <div className='wallet'>
            <h3>Ethereum Wallet</h3>
            <EthWallet mnemonic={mnemonic} />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
