import React from 'react';

interface IGenericThingForm {
    id?: string,
    shape: string
};

const GenericThingForm = ({id, shape}: IGenericThingForm) => {

    //if(id == null) id = randomUUID();
    if(id == null) id = "replace-me";

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
