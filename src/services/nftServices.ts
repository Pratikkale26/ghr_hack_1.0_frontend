import { ethers } from 'ethers';
import DataNFTAbi from './DataNFTAbi.json';

const CONTRACT_ADDRESS = import.meta.env.VITE_NFT_CONTRACT_ADDRESS;

export async function mintNFT(tokenURI: string, validityPeriod: number, terms: string): Promise<string> {
  if (!window.ethereum) throw new Error("No crypto wallet found");

  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, DataNFTAbi, signer);

  try {
    const tx = await contract.mintNFT(await signer.getAddress(), tokenURI, validityPeriod, terms);
    const receipt = await tx.wait();

    console.log("Transaction Receipt:", receipt); // Debug log

    // Access events in Ethers.js
    const event = receipt.logs.find((log: any) => log.fragment && log.fragment.name === "Transfer");

    if (!event) {
      throw new Error("Transfer event not found in transaction receipt");
    }

    // Extract `tokenId` from event args
    const tokenId = event.args.tokenId.toString();
    console.log("Minted NFT Token ID:", tokenId);

    return tokenId;
  } catch (err) {
    console.error("Error minting NFT:", err);
    throw err;
  }
}
