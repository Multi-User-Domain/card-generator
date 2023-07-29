import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import axios from 'axios';

interface IGenericThingForm {
    id?: string,
    shape: string
};

const GenericThingForm = ({id, shape}: IGenericThingForm) => {

    const [generatedId, setGeneratedId] = useState<string|null>(null);
    const [loadedShape, setLoadedShape] = useState<string|null>(null);
    const [loadingContent, setLoadingContent] = useState<string>("Loading...");

    // on first rendering, load the shape string from the given URL
    useEffect(() => {
        if(validator.isURL(shape)) {
            axios.get(shape).then((res) => {
                setLoadedShape(res.data);
            })
            .catch((err: any) => {
                setLoadingContent("Error loading form: " + err);
            });
        }
        else setLoadedShape(shape);
    }, []);

    // auto-generate unique id if none given by user
    if(id == null) {
        if(generatedId != null) id = generatedId;
        else {
            let tmp = "generic-thing-" + uuidv4();
            id = tmp;
            setGeneratedId(tmp);
        }
    }

    if(loadedShape == null) {
        return <p>{loadingContent}</p>;
    }

    // shacl-form is a HTMLElement. Convert to a React element during rendering
    let form = React.createElement("shacl-form", {
        "data-shapes": loadedShape,
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
