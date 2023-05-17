import React, { ChangeEvent, useState } from 'react';

interface HealthPointsState {
  "@id": string;
  "@type": string;
  "mudcombat:maximumP": string;
  "mudcombat:currentP": string;
}

interface HealthPointsFormProps {
  onChange: (property: string, value: HealthPointsState) => void;
}

const HealthPointsForm = ({ onChange }: HealthPointsFormProps) => {
  const [healthPoints, setHealthPoints] = useState({
    "@id": "",
    "@type": "https://raw.githubusercontent.com/Multi-User-Domain/vocab/main/mudcombat.ttl#HealthPoints",
    "mudcombat:maximumP": "",
    "mudcombat:currentP": ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedHealthPoints = { ...healthPoints, [e.target.name]: e.target.value };
    setHealthPoints(updatedHealthPoints);
    onChange('mudcombat:hasHealthPoints', updatedHealthPoints);
  };

  return (
    <div>
      <input name="mudcombat:maximumP" onChange={handleChange} placeholder="Max Health Points" />
    </div>
  );
};

export default HealthPointsForm;
