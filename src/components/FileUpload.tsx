import React, { useState } from "react";
import { uploadToPinata } from "../services/pinataServices";
import { mintNFT } from "../services/nftServices";
import Spinner from "./Spinner";

interface FileUploadProps {
  onUploadSuccess: (cid: string, tokenId: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [validityPeriod, setValidityPeriod] = useState(30); // Default 30 days
  const [terms, setTerms] = useState("");
  const [licenseType, setLicenseType] = useState("CC-BY-4.0");

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
        license: {
          validity_days: validityPeriod,
          terms: terms,
          valid_until: new Date(Date.now() + validityPeriod * 86400 * 1000).toISOString(),
        },
      };

      const metadataBlob = new Blob([JSON.stringify(metadata)], { type: "application/json" });
      const metadataFile = new File([metadataBlob], "metadata.json", { type: "application/json" });
      const metadataCid = await uploadToPinata(metadataFile);

      const tokenId = await mintNFT(metadataCid, validityPeriod * 86400, terms); // Converts days to seconds
      onUploadSuccess(cid, tokenId);
    } catch (err) {
      setError("Failed to upload file and mint NFT. Please try again.");
      console.log(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-lg space-y-6 border border-gray-700">
      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium mb-2 text-white">
          Upload Data File *
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md 
            file:border-0 file:bg-gray-800 file:text-gray-400 hover:file:bg-white cursor-pointer"
          accept=".jpg,.jpeg,.png,.gif,.mp4,.mov,.zip,.csv,.json"
        />
        <p className="mt-1 text-xs text-gray-400">
          Supported: JPG, PNG, GIF, MP4, MOV, ZIP, CSV, JSON
        </p>
      </div>

      {/* NFT Name */}
      <div>
        <label className="block text-sm font-medium mb-2 text-white">NFT Name *</label>
        <input
          type="text"
          placeholder="Dataset Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-400">Description *</label>
        <textarea
          placeholder="Describe your dataset..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          rows={3}
          required
        />
      </div>

      {/* License Details */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-400">License Type *</label>
          <select
            className="w-full p-3 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={licenseType}
            onChange={(e) => setLicenseType(e.target.value)}
          >
            <option value="CC-BY-4.0">Creative Commons Attribution 4.0</option>
            <option value="CC-BY-NC-4.0">Creative Commons Non-Commercial</option>
            <option value="MIT">MIT License</option>
            <option value="CUSTOM">Custom License</option>
          </select>
        </div>

        {licenseType === "CUSTOM" && (
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-400">Custom Terms *</label>
            <textarea
              placeholder="Specify custom license terms..."
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              className="w-full p-3 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              rows={4}
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-400">Validity Period (days) *</label>
          <input
            type="number"
            min="1"
            max="365"
            value={validityPeriod}
            onChange={(e) => setValidityPeriod(Math.max(1, Number(e.target.value)))}
            className="w-full p-3 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <p className="mt-1 text-xs text-gray-400">
            License expires in {validityPeriod} days
          </p>
        </div>
      </div>

      {/* Upload & Mint Button */}
      <button
        onClick={handleUploadAndMint}
        disabled={!file || uploading || !name || !description}
        className={`w-full px-6 py-3 rounded-lg font-medium transition-all ${
          !file || uploading || !name || !description
            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
        }`}
      >
        {uploading ? (
          <span className="flex items-center justify-center gap-2">
            <Spinner /> Processing...
          </span>
        ) : (
          "Upload & Mint NFT"
        )}
      </button>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-900 text-red-300 rounded-lg border border-red-700">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
