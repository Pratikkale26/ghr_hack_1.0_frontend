import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Copy, Check } from "lucide-react";

export function Appbar() {
  const { address } = useAccount();

  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white px-6 py-4 shadow-lg border-b border-gray-800">
      {/* Logo */}
      <div className="text-3xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
        NFTfy
      </div>

      {/* Wallet Connect / Disconnect */}
      <div className="flex items-center gap-4">
        {address ? <WalletInfo address={address} /> : <Connectors />}
      </div>
    </nav>
  );
}

// 🔹 Connect Wallet UI
function Connectors() {
  const { connectors, connect } = useConnect();

  return (
    <div className="flex gap-3">
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md transition-all hover:bg-blue-700"
        >
          Connect {connector.name}
        </button>
      ))}
    </div>
  );
}

// 🔹 Wallet Info & Copy Button
function WalletInfo({ address }: { address: string }) {
  const { disconnect } = useDisconnect();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-4 bg-gray-800 px-4 py-2 rounded-lg">
      {/* Public Key Display */}
      <span className="text-sm text-gray-300">
        {address.slice(0, 6)}...{address.slice(-4)}
      </span>

      {/* Copy Button */}
      <button
        onClick={copyToClipboard}
        className="text-gray-400 hover:text-gray-100 transition-all flex items-center"
      >
        {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
      </button>

      {/* Disconnect Button */}
      <button
        onClick={() => disconnect()}
        className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg shadow-md transition-all hover:bg-red-700"
      >
        Disconnect
      </button>
    </div>
  );
}
