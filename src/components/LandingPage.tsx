import { Database, Lock, Banknote, Brain, Guitar as Hospital, LineChart, Users, Server, Network, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate(); // React Router hook for navigation

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
        {/* Hero Section */}
        <div 
        className="relative min-h-screen flex items-center justify-center"
        style={{
            backgroundImage: 'linear-gradient(rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.9)), url(https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
        >
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>

        {/* App Name (Top Left Corner) */}
        <div className="absolute top-6 left-6 text-white text-4xl font-bold bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            NFTfy
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                The Future of Data Exchange
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-300">
                NFTfy your datasets. Set your terms. Monetize fairly.
            </p>
            <button 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105" 
                onClick={() => navigate('/dashboard')}
            >
                Get Started
            </button>
            </div>
        </div>

        {/* Team Name & Slogan (Bottom Right) */}
        <div className="absolute bottom-8 right-8 text-right text-gray-300">
            <h3 className="text-lg font-semibold">🚀 Built by</h3>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">
            Mugiwara Devs
            </h2>
            <p className="text-sm italic text-gray-400 mt-2">
            "As long as I am alive, there are infinite possibilities."
            </p>
        </div>
        </div>



      {/* Market Comparison Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Centralized vs Decentralized Markets
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-8 rounded-xl bg-gray-800 border border-gray-700">
              <div className="flex items-center mb-6">
                <Server className="w-8 h-8 text-gray-400 mr-4" />
                <h3 className="text-2xl font-semibold">Centralized</h3>
              </div>
              <ul className="space-y-4 text-gray-300">
                <li>• Limited control over data</li>
                <li>• Fixed pricing models</li>
                <li>• Restricted access rights</li>
                <li>• Platform-dependent</li>
              </ul>
            </div>
            <div className="p-8 rounded-xl bg-gradient-to-br from-blue-900 to-purple-900 border border-blue-700">
              <div className="flex items-center mb-6">
                <Network className="w-8 h-8 text-blue-400 mr-4" />
                <h3 className="text-2xl font-semibold">Decentralized</h3>
              </div>
              <ul className="space-y-4 text-gray-200">
                <li>• Complete data ownership</li>
                <li>• Flexible pricing & terms</li>
                <li>• Customizable licensing</li>
                <li>• Platform independence</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16">Use Cases</h2>
            <div className="grid md:grid-cols-3 gap-8">
            {[
                {
                icon: <Brain className="w-12 h-12 text-blue-400" />,
                title: "AI Training",
                description: "High-quality datasets for machine learning models",
                },
                {
                icon: <Hospital className="w-12 h-12 text-blue-400" />,
                title: "Medical Research",
                description: "Secure sharing of anonymous medical data",
                },
                {
                icon: <LineChart className="w-12 h-12 text-blue-400" />,
                title: "Financial Analytics",
                description: "Market data and financial insights",
                },
                {
                icon: <Users className="w-12 h-12 text-blue-400" />,
                title: "Content Creators",
                description: "Monetize videos, graphics, and other digital assets with full ownership.",
                },
                {
                icon: <Lock className="w-12 h-12 text-blue-400" />,
                title: "Music & Movie Industry",
                description: "Secure licensing and royalty management for digital media.",
                },
                {
                icon: <Database className="w-12 h-12 text-blue-400" />,
                title: "Blogs & Research Papers",
                description: "Ensure proper attribution and monetize research findings.",
                },
            ].map((item, index) => (
                <div
                key={index}
                className="p-6 rounded-xl bg-gray-900 border border-gray-700 hover:border-blue-600 transition-all duration-300"
                >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
                </div>
            ))}
            </div>
        </div>
        </section>


      {/* Advantages Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Advantages</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Database className="w-8 h-8" />,
                title: 'True Ownership',
                description: 'Complete control over your data assets'
              },
              {
                icon: <Banknote className="w-8 h-8" />,
                title: 'Fair Monetization',
                description: 'Set your own prices and terms'
              },
              {
                icon: <Lock className="w-8 h-8" />,
                title: 'Security',
                description: 'Blockchain-backed data protection'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Transparency',
                description: 'Clear tracking of data usage'
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-6">
                <div className="inline-block p-4 rounded-full bg-blue-900 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-blue-900">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">The Future is Decentralized</h2>
            <p className="text-xl text-gray-300 mb-12">
              Join the revolution in data exchange. Create new revenue streams, maintain control over your intellectual property, and contribute to a more equitable data economy.
            </p>
            <button className="group bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center mx-auto">
              Learn More
              <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center text-gray-500">
          <p>© 2025 Decentralized Data Marketplace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;