import React, { useState } from 'react';
import { uploadToPinata } from '../services/pinataServices';
import { mintNFT } from '../services/nftServices';

interface FileUploadProps {
  onUploadSuccess: (cid: string, tokenId: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [validityPeriod, setValidityPeriod] = useState(30); // 30 days for now
  const [terms, setTerms] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setError(null);
    }
  };

  const handleUploadAndMint = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const cid = await uploadToPinata(file);
      
      const metadata = {
        name,
        description,
        image: cid,
      };
      
      // const metadataCid = await uploadToPinata(new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
      const metadataFile = new File([metadataBlob], 'metadata.json', { type: 'application/json' });
      const metadataCid = await uploadToPinata(metadataFile);
      
      const tokenId = await mintNFT(metadataCid, validityPeriod * 86400, terms); // this converts days to seconds
      
      onUploadSuccess(cid, tokenId);
    } catch (err) {
      setError("Failed to upload file and mint NFT. Please try again.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-4">
      <input type="file" onChange={handleFileChange} className="mb-2 block" />
      <input 
        type="text" 
        placeholder="NFT Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        className="mb-2 block w-full p-2 border rounded"
      />
      <textarea 
        placeholder="Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        className="mb-2 block w-full p-2 border rounded"
      />
      <input 
        type="number" 
        placeholder="Validity Period (days)" 
        value={validityPeriod} 
        onChange={(e) => setValidityPeriod(Number(e.target.value))} 
        className="mb-2 block w-full p-2 border rounded"
      />
      <textarea 
        placeholder="License Terms" 
        value={terms} 
        onChange={(e) => setTerms(e.target.value)} 
        className="mb-2 block w-full p-2 border rounded"
      />
      <button
        onClick={handleUploadAndMint}
        disabled={!file || uploading}
        className={`mt-2 px-4 py-2 rounded ${
          !file || uploading
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {uploading ? 'Processing...' : 'Upload and Mint NFT'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default FileUpload;
