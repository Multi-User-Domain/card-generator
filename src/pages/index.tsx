import Image from 'next/image'
import CardForm from '../components/CardForm'
import CardPreviewer from '../components/CardPreviewer'
import { CardStateContextProvider, CardStateContext, initialCardState } from '../components/Context';  
import Layout from '../layouts/Layout'

export default function Home() {
  return (
    <Layout>
      <CardStateContextProvider>
        <div className="bg-black bg-opacity-70 rounded-xl h-full-1/2 lg:max-w-7xl lg:mx-auto sm:p-6 lg:px-8 flex flex-col lg:flex-row">
          <div className="flex-1 lg:w-2/6">
            <CardForm />
          </div>
          {/* Right column (hidden on small screens) */}
          <div className="lg:w-4/6 flex items-center justify-center ">
          	<CardPreviewer />
          </div>
        </div>
      </CardStateContextProvider>
    </Layout>
  )
}
