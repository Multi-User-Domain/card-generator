import CardStateType from './CardForm'
import { useContext  } from 'react' 
import { CardStateContext } from './Context';

interface CardPrewierProps {
  onChange: (property: string, value: { "@id": string, "mudcombat:resistanceValue": number }[]) => void;
}



export default function CardPreviewer() {
  const { cardState, setCardState } = useContext(CardStateContext)

  const showCurrentResistances = () => {
    return (
      <ul>
        {cardState["mudcombat:hasResistances"].map( (v, i) => 
        	(<li key={i}>{v['@id'].split('#')[1]}: {v['mudcombat:resistanceValue']}</li>))}
      </ul>
    )
   
  }

  const showCurrentInstantActions = () => {
    return (
      <ul>
        {cardState["mudcard:hasAvailableInstantActions"].map( (v, i) => (<li key={i}>{v.name}</li>))}
      </ul>
    )
  }
            // { cardState["mudcard:hasAvailableInstantActions"].map( (v) => v) }<br/>
            // { cardState["mudcombat:hasResistances"].map( (v) => v) }

  return(
    <> 
      {/* Card Container */}
      <div className="relative w-96 h-128 bg-white rounded-lg shadow-lg cardtexture  border-4 border-black">
        {/* Card Title*/}
        <div className="absolute   w-full p-2  flex items-center">
            { cardState["n:fn"] }<br/>
        </div>
        {/* Card PV*/}
        <div className="absolute w-8 h-8 right-0   bg-gradient-to-t from-green-200 to-blue-300 justify-center rounded-full flex items-center">
          {  cardState["mudcombat:hasHealthPoints"]["mudcombat:maximumP"]}        </div>
        {/* Card Image  https://via.placeholder.com/150 */}
        <div className="h-2/3 w-full mt-9 border-yellow-800 border-4">
          <img 
            className="object-cover   h-full w-full" 
            src={cardState['foaf:depiction']} 
            alt="card preview" 
          />
        </div>
        {/* Card Text */}
        <div className="h-1/3 w-full p-4 overflow-scroll">
          <span className="text-black">
            <br/>
						{ showCurrentInstantActions() }<br/>
						{ showCurrentResistances() }<br/>
            <p className="text-center italic">{cardState["n:hasNote"]}</p><br/>
          </span>
        </div>
      </div>
  </>
  )
}
