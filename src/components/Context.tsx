import React, { createContext, useState, useContext } from 'react';

interface CardStateType {
  "@id": string;
  "@type": string;
  "mud:implementsSpecification": string;
  "n:fn": string;
  "foaf:name": string;
  "foaf:depiction": string;
  "n:hasNote": string;
  "mudcombat:hasHealthPoints": {
    "@id": string;
    "@type": string;
    "mudcombat:maximumP": number;
    "mudcombat:currentP": number;
  };
  "mudcard:hasAvailableInstantActions": any[]; // replace with the correct type
  "mudcombat:hasResistances": any[]; // replace with the correct type
}


const foo = {
  "@id": { "type": "string"},
  "@type": { "type": "string"},
  "mud:implementsSpecification": { "type": "string"},
  "n:fn": { "type": "string"},
  "foaf:name": { "type": "string"},
  "foaf:depiction": { "type": "string"},
  "n:hasNote": { "type": "string"},
  "mudcombat:hasHealthPoints": {
    "@id": {"type": "string"},
    "@type": {"type": "string"},
    "mudcombat:maximumP": {"type": "number"},
    "mudcombat:currentP": {"type": "number"},
  },
  "mudcard:hasAvailableInstantActions": [], // replace with the correct type
  "mudcombat:hasResistances": [], // replace with the correct type
}

export const initialCardState =  {
    "@id": "",
    "@type": "https://raw.githubusercontent.com/Multi-User-Domain/vocab/main/mudchar.ttl#Character",
    "mud:implementsSpecification": "https://raw.githubusercontent.com/Multi-User-Domain/vocab/main/mudcard.ttl#playableCard",
    "n:fn": "Fireborn Fury",
    "foaf:name": "Fireborn Fury",
    "foaf:depiction": "https://upload.wikimedia.org/wikipedia/commons/a/a3/1950s_Era_Fantasy_Art_Draogn_and_Nymph.jpg",
    "n:hasNote": "The anger of a dragon is a wildfire untamed.",
    "mudcombat:hasHealthPoints": {
      "@id": "",
      "@type": "https://raw.githubusercontent.com/Multi-User-Domain/vocab/main/mudcombat.ttl#HealthPoints",
      "mudcombat:maximumP": 20,
      "mudcombat:currentP": 20
    },
    "mudcard:hasAvailableInstantActions": [],
    "mudcombat:hasResistances": []
  }

interface CardContextType {
  cardState: CardStateType;
  setCardState: React.Dispatch<React.SetStateAction<CardStateType>>;
}


const defaultSetCardState: React.Dispatch<React.SetStateAction<CardStateType>> = () => {};

// Provide the default values in the context creation
export const CardStateContext = createContext<CardContextType>({
  cardState: initialCardState,
  setCardState: defaultSetCardState,
});

// Create a provider for components to consume and subscribe to changes
export const CardStateContextProvider:  React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [cardState, setCardState] = useState<CardStateType>(initialCardState);

  return (
    <CardStateContext.Provider value={{ cardState, setCardState }}>
      {children}
    </CardStateContext.Provider>
  );
};
