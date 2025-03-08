import { ethers } from 'ethers';
import DataNFTAbi from './DataNFTAbi.json';  // i'll need to export this from my compiled contract

const CONTRACT_ADDRESS = import.meta.env.VITE_NFT_CONTRACT_ADDRESS;

export async function mintNFT(tokenURI: string, validityPeriod: number, terms: string): Promise<string> {
  if (!window.ethereum) throw new Error("No crypto wallet found");

  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, DataNFTAbi, signer);

  try {
    const tx = await contract.mintNFT(signer.getAddress(), tokenURI, validityPeriod, terms);
    const receipt = await tx.wait();
    const event = receipt.events.find((e: any) => e.event === 'Transfer');
    return event.args.tokenId.toString();
  } catch (err) {
    console.error("Error minting NFT:", err);
    throw err;
  }
}
