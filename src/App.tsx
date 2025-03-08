
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from './config'
import { Appbar } from './components/Appbar'
// import MintPage from './components/MintPage'
import FileUpload from './components/FileUpload'
 
const queryClient = new QueryClient()
 
export default function App() {
   return (
     <WagmiProvider config={config}>
       <QueryClientProvider client={queryClient}> 
         <Appbar />
         {/* <MintPage /> */}
         <FileUpload onUploadSuccess={(cid: string) => console.log(cid)} />
       </QueryClientProvider> 
     </WagmiProvider>
   )
 }

/* making the nft marketplace for the content creator, film maker adnd artist for licensing their content and sell it on the platform, can be used by the reserchers, healthcare and etc etc
things done: 
added the tailwind
add metamask
add ipfs data upload and receive cid 

things remaining:
add nft minting with the metadata and ipfs cid and title, description and license type/duration 
they can sell the nft on the marketplace
*/