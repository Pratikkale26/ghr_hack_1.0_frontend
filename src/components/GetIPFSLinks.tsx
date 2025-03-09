import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { Network, Alchemy } from "alchemy-sdk";

const GetIPFSLinks: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [nfts, setNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Alchemy setup (replace with your config)
  const config = {
    apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
    network: Network.ETH_HOLESKY,
  };
  const alchemy = new Alchemy(config);

  const fetchNFTs = async () => {
    if (!isConnected || !address) {
      setError("Wallet not connected");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Get all NFTs using Alchemy's optimized API
      const response = await alchemy.nft.getNftsForOwner(address, {
        contractAddresses: [import.meta.env.VITE_NFT_CONTRACT_ADDRESS],
      });

      const formattedNfts = await Promise.all(
        response.ownedNfts.map(async (nft) => {
          // Handle IPFS metadata
          const metadata = nft.rawMetadata || {};
          const image = metadata.image?.replace("ipfs://", "https://ipfs.io/ipfs/");
          
          return {
            tokenId: nft.tokenId,
            name: nft.title || `NFT #${nft.tokenId}`,
            description: metadata.description || "No description",
            image: image || '/fallback-image.jpg',
            encryptedCID: metadata.encryptedCID,
          };
        })
      );

      setNfts(formattedNfts);
    } catch (err: any) {
      console.error("NFT fetch error:", err);
      setError(err.message || "Error loading NFTs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected) fetchNFTs();
  }, [isConnected, address]);

  // Rest of your UI component remains the same
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-lg space-y-6">
      {/* Existing UI rendering code */}
    </div>
  );
};

export default GetIPFSLinks;
