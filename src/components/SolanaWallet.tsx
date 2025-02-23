import { mnemonicToSeed } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';
import nacl from 'tweetnacl';
import { useState } from 'react';

export function SolanaWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);

  return (
    <div className='max-w-lg mx-auto bg-gray-900 text-white p-6 rounded-2xl shadow-lg'>
      <h2 className='text-2xl font-bold text-center mb-4'>
        Solana Wallet Generator
      </h2>

      <button
        onClick={function () {
          const seed = mnemonicToSeed(mnemonic);
          const path = `m/44'/501'/${currentIndex}'/0'`;
          const derivedSeed = derivePath(path, seed.toString('hex')).key;
          const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
          const keypair = Keypair.fromSecretKey(secret);
          setCurrentIndex(currentIndex + 1);
          setPublicKeys([...publicKeys, keypair.publicKey]);
        }}
        className='w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md'
      >
        + Generate New Wallet
      </button>

      <div className='mt-6 space-y-2'>
        {publicKeys.map((p, index) => (
          <div
            key={index}
            className='bg-gray-800 p-3 rounded-lg shadow-md flex items-center justify-between'
          >
            <span className='text-sm text-gray-300'>Wallet {index + 1}:</span>
            <span className='font-mono text-green-400'>{p.toBase58()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
