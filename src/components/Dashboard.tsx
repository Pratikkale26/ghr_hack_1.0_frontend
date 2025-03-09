import { Appbar } from "./Appbar";
import FileUpload from "./FileUpload";
import GetIPFSLinks from "./GetIPFSLinks";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Appbar */}
      <Appbar />

      {/* Main Content Container */}
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Your Decentralized Data Hub
        </h1>

        {/* Upload Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-10">
          <h2 className="text-2xl font-semibold mb-4">Upload Your Dataset</h2>
          <FileUpload onUploadSuccess={(cid: string) => console.log(cid)} />
        </div>

        {/* NFT Data Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Your NFT Data</h2>
          <GetIPFSLinks />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
