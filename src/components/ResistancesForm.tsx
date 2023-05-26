import { InferGetStaticPropsType } from 'next';
import React, { ChangeEvent, useState, useContext, useEffect } from 'react';
import InstantActionsForm from './InstantActionsForm';
import { CardStateContext } from './Context'; 

interface ResistancesFormProps {
  onChange: (property: string, value: { "@id": string, "mudcombat:resistanceValue": number }[]) => void;
}

const ResistancesForm = ({ onChange }: ResistancesFormProps) => {

	const damageType = [
    {uri: "https://raw.githubusercontent.com/Multi-User-Domain/vocab/main/mudcombat.ttl#FireDamage", 
     name: "Fire Damage",
    },
    {uri: "https://raw.githubusercontent.com/Multi-User-Domain/vocab/main/mudcombat.ttl#NecraticDamage", 
     name: "Necratic Damage",
    },
    {uri: "https://raw.githubusercontent.com/Multi-User-Domain/vocab/main/mudcombat.ttl#PoisonDamage", 
     name: "Poison Damage",
    },
    {uri: "https://raw.githubusercontent.com/Multi-User-Domain/vocab/main/mudcombat.ttl#RadiantDamage", 
     name: "Radiant Damage",
    },
    {uri: "https://raw.githubusercontent.com/Multi-User-Domain/vocab/main/mudcombat.ttl#waterDamage", 
     name: "Water Damage",
    },
  ]

  const [resistanceId, setResistanceId] = useState<string>(damageType[0].uri) // FIXME: this assume the selector as the first damageType selected as default
  const [resistanceValue, setResistanceValue] = useState<string>("0");
  const [resistances, setResistances] = useState<{ [key: string]: number}>({});

  const { cardState, setCardState } = useContext(CardStateContext)


  function convertDictToArray(dict: { [key: string]: number }): { "@id": string, "mudcombat:resistanceValue": number, "name": string }[] {
      return Object.entries(dict).map(([key, value]) => ({
          "@id": key,
          "mudcombat:resistanceValue": value,
          "name": damageType.filter( (v) =>  v.uri == key )[0].name  // REDO ME
      }));
  }


 	const updatedResistanceValue = (e: ChangeEvent<HTMLInputElement>) => {
   	console.log("updating resistance value to: " + e.target.value)
    setResistanceValue(e.target.value);

 	}
	
  const handleAdd = () => {
    const resistanceValueAsFloat = parseFloat(resistanceValue);
   	console.log("parse resistance value to float: " + resistanceValueAsFloat)
    if (isNaN(resistanceValueAsFloat)) {
      // TODO show an error to the user
      console.log("coulnt parse value")
    }else{
      const updatedResistances = {...resistances, [resistanceId]: resistanceValueAsFloat};
      setResistances(updatedResistances)
      onChange('mudcombat:hasResistances', convertDictToArray(updatedResistances));
      setCardState({...cardState, 'mudcombat:hasResistances': convertDictToArray(updatedResistances)})
     	console.log("updating resistances" + resistanceValueAsFloat)
      // setResistanceId("");
      setResistanceValue("0")
    }
  };

	const remove = (id: string) => {
  	const newResistances = {...resistances}
  	delete newResistances[id]
  	setResistances(newResistances)
    setCardState({...cardState, 'mudcombat:hasResistances': convertDictToArray(newResistances)})
	}

  const showCurrentResistances = () => {
    return (
      <table className="ml-10">
        {convertDictToArray(resistances).map( (v, i) => (
          <tr  key={i} className="color-egg" >
            <td className="px-5" >
            	{v['name']}: {v['mudcombat:resistanceValue']}
          	</td>
          	<td>
              <button className="button-bounce  " type="button" onClick={() => remove(v['@id'])}>❌</button>
          	</td>
        </tr>
        ))}
      </table>
    )
  }

  return (
 <div>
      <select name="@id" value={resistanceId} onChange={(e: ChangeEvent<HTMLSelectElement>) => setResistanceId(e.target.value)} >  
      { damageType.map(({uri, name}) => ( <option key={uri} value={uri}>{name}</option> )) }
      </select>

      <input name="mudcombat:resistanceValue" value={`${resistanceValue}`} onChange={updatedResistanceValue} placeholder="Resistance Value" className="inline w-14"  />  
      <button className="button-bounce" type="button" onClick={handleAdd}>➕</button>
 			{showCurrentResistances()}
    </div>
  );
};

export default ResistancesForm;

