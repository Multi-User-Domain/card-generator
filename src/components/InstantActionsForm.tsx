import { InferGetStaticPropsType } from 'next';
import React, { ChangeEvent, useState, useMemo, useEffect } from 'react';

interface InstantActionsFormProps {
  onChange: (property: string, value: { "@id": string }[]) => void;
}

const actions_url = [
"https://raw.githubusercontent.com/Multi-User-Domain/games-transformed-jam-2023/master/assets/rdf/actions/basicAttack.json",
"https://raw.githubusercontent.com/Multi-User-Domain/games-transformed-jam-2023/master/assets/rdf/actions/generateCard.json",
"https://raw.githubusercontent.com/Multi-User-Domain/games-transformed-jam-2023/master/assets/rdf/actions/healParty.json",
"https://raw.githubusercontent.com/Multi-User-Domain/games-transformed-jam-2023/master/assets/rdf/actions/healingWord.json",
"https://raw.githubusercontent.com/Multi-User-Domain/games-transformed-jam-2023/master/assets/rdf/actions/poisonAttack.json",
]

interface instantActionType {
  uri: string;
  name: string;
}

const InstantActionsForm = ({ onChange }: InstantActionsFormProps) => {


 const [cardInstantActions, setCardInstantActions] = useState<any[]>([]) // FIXME don't use any
 const [availableInstantActions, setAvailableInstantActions] = useState<instantActionType[]>([])
 const [formSelectedInstantAction, setFormSelectedInstantAction] = useState< null|instantActionType>(null) // FIXME don't use any

 useEffect( () => {
   if (availableInstantActions.length > 0 &&  !formSelectedInstantAction)
     setFormSelectedInstantAction(availableInstantActions[0])
 }, [availableInstantActions])

  const [instantAction, setInstantAction] = useState<string>("");  // edited
  // const [instantActions, setInstantActions] = useState<{ "@id": string }[]>([]);  // edited

	// const availableInstantActions = useEffect( () => {
  useEffect( () => {
    const fetchActions = async () => {
      try {
        const actionPromises = actions_url.map(async (url, index) => {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("HTTP error " + response.status);
          }
          const json = await response.json();
          console.log(json);  // prints the value of "foo" property
          const attackName = json["n:fn"]
          return {'uri': `${url}`, 'name': `${attackName}`}
        });

        // const availableInstantActions = await Promise.all(actionPromises);
        setAvailableInstantActions(await Promise.all(actionPromises))
        // return await Promise.all(actionPromises)

        // console.log(availableInstantActions); // Should print out your availableInstantActions array

      } catch (error) {
        console.log("Fetch error occurred: ", error);
      }
    };
    // return fetchActions();
    fetchActions();
	}, [actions_url])




  const handleAdd = () => {
    // const alreadyInArray = instantActions.some(action => action["@id"] === instantAction)
    const alreadyInArray = cardInstantActions.some(action => {
      return formSelectedInstantAction ?
        action.uri === formSelectedInstantAction.uri
        : false
    })
    if (!alreadyInArray){
      const updatedInstantActions = [...cardInstantActions, formSelectedInstantAction];
        // const updatedInstantActions = [...instantActions, instantActionId ];
        setCardInstantActions(updatedInstantActions)
        onChange('mudcard:hasAvailableInstantActions', updatedInstantActions);
       	console.log("updating instantActions" )
    }  
  };


	const remove = (uri: string) => {
  	const filtered = cardInstantActions.filter(item => item.uri !== uri);
  	setCardInstantActions(filtered)
    onChange('mudcard:hasAvailableInstantActions', filtered);
	}

  const showCurrentInstantActions = () => {
    return (
      <table className="ml-10">
        {cardInstantActions.map( (v, i) => (
          <tr  key={i} className="color-egg  fade-in-bounce" >
            <td className="px-5">
            	{v.name} 
          	</td>
          	<td>
              <button className="button-bounce  " type="button" onClick={() => remove(v.uri)}>❌</button>
          	</td>
        </tr>
        ))}
      </table>
    )
  }
	const changeSelectedInstantAction = (e: ChangeEvent<HTMLSelectElement>) => {
  	const newSelectedInstantAction = availableInstantActions.find( item => item.uri === e.target.value)
  	if (newSelectedInstantAction) 
    	setFormSelectedInstantAction(newSelectedInstantAction);
  	else 
    	console.log("ERROR couldn't select current action")
	}
  return (
 <div>
      <select name="@id"  onChange={changeSelectedInstantAction} >  
      {  availableInstantActions.map((action, index) => ( <option key={action.uri} value={action.uri}>{action.name}</option> )) }
      </select>
      <button className="button-bounce" type="button" onClick={handleAdd}>➕</button>
 			{showCurrentInstantActions()}
    </div>
  );
};

export default InstantActionsForm;

