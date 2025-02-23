import { useState } from 'react';
import { generateMnemonic } from 'bip39';
import { SolanaWallet } from './components/SolanaWallet';
import { EthWallet } from './components/EthereumWallet';

const App = () => {
  const [mnemonic, setMnemonic] = useState('');

  return (
    <div className='min-h-screen bg-gray-900 text-white flex flex-col items-center py-10'>
      <h1 className='text-3xl font-bold mb-6'>Web3 Wallet Generator</h1>

      <div className='bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md'>
        <input
          type='text'
          value={mnemonic}
          readOnly
          className='w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none'
          placeholder='Your seed phrase will appear here...'
        />

        <button
          onClick={async () => {
            const mn = await generateMnemonic();
            setMnemonic(mn);
          }}
          className='w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg mt-4 transition-all shadow-md'
        >
          Create Seed Phrase
        </button>
      </div>

      {mnemonic && (
        <div className='mt-8 space-y-6 w-full max-w-lg'>
          <div className='bg-gray-800 p-6 rounded-lg shadow-lg'>
            <h3 className='text-xl font-semibold mb-2'>Solana Wallet</h3>
            <SolanaWallet mnemonic={mnemonic} />
          </div>

          <div className='bg-gray-800 p-6 rounded-lg shadow-lg'>
            <h3 className='text-xl font-semibold mb-2'>Ethereum Wallet</h3>
            <EthWallet mnemonic={mnemonic} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
