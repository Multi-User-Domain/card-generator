import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface IGenericThingForm {
    id?: string,
    shape: string
};

const GenericThingForm = ({id, shape}: IGenericThingForm) => {

    const [generatedId, setGeneratedId] = useState<string|null>(null);

    // auto-generate unique id if none given by user
    if(id == null) {
        if(generatedId != null) id = generatedId;
        else {
            let tmp = "generic-thing-" + uuidv4();
            id = tmp;
            setGeneratedId(tmp);
        }
    }

    // shacl-form is a HTMLElement. Convert to a React element during rendering
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
