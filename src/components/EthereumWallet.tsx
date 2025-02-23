import { useState } from 'react';
import { mnemonicToSeed } from 'bip39';
import { Wallet, HDNodeWallet } from 'ethers';

export const EthWallet = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState([]);

  return (
    <div className='max-w-lg mx-auto bg-gray-900 text-white p-6 rounded-2xl shadow-lg'>
      <h2 className='text-2xl font-bold text-center mb-4'>
        Ethereum Wallet Generator
      </h2>

      <button
        onClick={async function () {
          const seed = await mnemonicToSeed(mnemonic);
          const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
          const hdNode = HDNodeWallet.fromSeed(seed);
          const child = hdNode.derivePath(derivationPath);
          const privateKey = child.privateKey;
          const wallet = new Wallet(privateKey);
          setCurrentIndex(currentIndex + 1);
          setAddresses([...addresses, wallet.address]);
        }}
        className='w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md'
      >
        + Generate New Wallet
      </button>

      <div className='mt-6 space-y-2'>
        {addresses.map((p, index) => (
          <div
            key={index}
            className='bg-gray-800 p-3 rounded-lg shadow-md flex items-center justify-between transition-opacity duration-300 opacity-100'
          >
            <span className='text-sm text-gray-300'>Wallet {index + 1}:</span>
            <span className='font-mono text-green-400 break-all'>{p}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
