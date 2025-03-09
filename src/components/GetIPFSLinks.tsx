import React, { useState, useEffect } from "react";
import { useAccount, usePublicClient } from "wagmi";
import { ethers } from "ethers";
import DataNFTAbi from "../abis/DataNFTAbi.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_NFT_CONTRACT_ADDRESS;

const GetIPFSLinks: React.FC = () => {
  const { address, isConnected } = useAccount();
  const provider = usePublicClient();
  const [nfts, setNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Fetch NFTs owned by the connected wallet
  const fetchNFTs = async () => {
    if (!isConnected || !address) {
      setError("Wallet not connected");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, DataNFTAbi, provider);
      const balance = await contract.balanceOf(address);

      if (balance.toNumber() === 0) {
        setNfts([]);
        return;
      }

      const ownedNFTs = [];
      for (let i = 0; i < balance; i++) {
        const tokenId = await contract.tokenOfOwnerByIndex(address, i);
        const tokenURI = await contract.tokenURI(tokenId);

        // Fetch metadata from IPFS
        const metadataResponse = await fetch(tokenURI.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/"));
        if (!metadataResponse.ok) throw new Error(`Failed to fetch metadata for token ${tokenId}`);
        const metadata = await metadataResponse.json();

        ownedNFTs.push({ tokenId: tokenId.toString(), ...metadata });
      }

      setNfts(ownedNFTs);
    } catch (err) {
      console.error("Failed to fetch NFTs:", err);
      setError("Failed to fetch NFTs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected) fetchNFTs();
  }, [isConnected]);

  // 🔹 Fetch dataset from IPFS
  const fetchIPFSData = async (cid: string) => {
    try {
      setDownloading(true);
      const response = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`);
      if (!response.ok) throw new Error("Failed to fetch data from IPFS");
      return await response.blob(); // Convert to downloadable format
    } catch (error) {
      console.error("Error fetching from IPFS:", error);
      return null;
    } finally {
      setDownloading(false);
    }
  };

  // 🔹 Download dataset
  const handleDownload = async (cid: string, name: string) => {
    const fileBlob = await fetchIPFSData(cid);
    if (!fileBlob) {
      alert("Failed to fetch dataset.");
      return;
    }

    const url = URL.createObjectURL(fileBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.zip`; // Change extension based on file type
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-lg space-y-6">
      <h1 className="text-2xl font-bold">Your NFT Data</h1>

      {error && <p className="text-red-500">{error}</p>}

      {!isConnected ? (
        <p>Please connect your wallet to view your NFTs.</p>
      ) : loading ? (
        <p>Loading NFTs...</p>
      ) : nfts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {nfts.map((nft) => (
            <div key={nft.tokenId} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2">{nft.name}</h2>
              <p className="text-sm text-gray-400 mb-4">{nft.description}</p>
              <img
                src={nft.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")}
                alt={nft.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <button
                onClick={() => window.open(nft.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/"), "_blank")}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View on IPFS
              </button>

              {nft.encryptedCID && (
                <div className="mt-4">
                  <button
                    onClick={() => handleDownload(nft.encryptedCID, nft.name)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    {downloading ? "Downloading..." : "Download Dataset"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No NFTs found in your wallet.</p>
      )}
    </div>
  );
};

export default GetIPFSLinks;
