import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface IGenericThingForm {
    id?: string,
    shape: string
};

const GenericThingForm = ({id, shape}: IGenericThingForm) => {

    const [generatedId, setGeneratedId] = useState<string|null>(null);

    if(id == null) {
        if(generatedId != null) id = generatedId;
        else {
            let tmp = "generic-thing-" + uuidv4();
            id = tmp;
            setGeneratedId(tmp);
        }
    }

    let form = React.createElement("shacl-form", {
        "data-shapes": shape,
        "id": id,
        "className": "genric-thing-form"
    });

    return (
        <div>
            {form}
        </div>
    );
};

export default GenericThingForm;
