import Image from 'next/image'
import CardForm from '../components/CardForm'
import CardPreviewer from '../components/CardPreviewer'
import { CardStateContextProvider, CardStateContext, initialCardState } from '../components/Context';  
import Layout from '../layouts/Layout'
import {useRef} from 'react'

import {exportAsImage, html2image } from './component_to_image'

export default function Home() {
  const cardPreviewerRef = useRef(null);

  // const targetUrl = 'https://api.realm.games.coop/cards/' 
  const targetUrl = 'http://localhost:5000/cards/' 

	const sendCardImage = async (targetUrl: string) => {
		const image = await html2image(cardPreviewerRef.current)
		console.log("iiimage")
		console.log(image)
    fetch(targetUrl, {
      	method: 'POST',
      	body: JSON.stringify({'base64image': image}),
      	headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '"*"'
      	}
    }).then(function (response) {
      	if (response.ok) {
        			return response.json();
      	}
      		return Promise.reject(response);
    }).then(function (data) {
      	console.log(data);
	    location.reload();
    }).catch(function (error) {
      	console.warn('Something went wrong.', error);
    });
	}

  return (
    <Layout>
              <button onClick={() => exportAsImage(cardPreviewerRef.current, "test")}>
                Capture Image
              </button>
      <CardStateContextProvider>
        <div className="bg-black bg-opacity-70 rounded-xl h-full-1/2 lg:max-w-7xl lg:mx-auto sm:p-6 lg:px-8 flex flex-col lg:flex-row">
          <div className="flex-1 lg:w-2/6">
            <CardForm />
            <button className="button-fantasy"  onClick={(e) => sendCardImage(targetUrl)} type="submit">Create Card ( As image )</button><br/>
          </div>
          {/* Right column (hidden on small screens) */}
          <div className="lg:w-4/6 flex items-center justify-center ">
						<div ref={cardPreviewerRef}>
            	<CardPreviewer  />
          	</div>
          </div>
        </div>
      </CardStateContextProvider>
    </Layout>
  )
}
