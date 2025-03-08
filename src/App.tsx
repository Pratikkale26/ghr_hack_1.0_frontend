
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from './config'
import { Appbar } from './components/Appbar'
import FileUpload from './components/FileUpload'
// import Marketplace from './components/MarketPlace'
 
const queryClient = new QueryClient()
 
export default function App() {
   return (
     <WagmiProvider config={config}>
       <QueryClientProvider client={queryClient}> 
         <Appbar />
         <FileUpload onUploadSuccess={(cid: string) => console.log(cid)} />
          {/* <Marketplace /> */}
       </QueryClientProvider> 
     </WagmiProvider>
   )
 }

/* making the nft marketplace for the content creator, film maker adnd artist for licensing their content and sell it on the platform, can be used by the reserchers, healthcare and etc etc
things done: 
added the tailwind
add metamask
add ipfs data upload and receive cid 
add nft minting with the metadata and ipfs cid and title, description and license type/duration 

things remaining:
things changed now we are not creating the marketplace we will be using the external like opensea, now we need to give the content access to the nft buyer only

they can sell the nft on the marketplace
*/