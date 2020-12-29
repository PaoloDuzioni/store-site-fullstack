import { useState } from 'react';

/**
 * UseForm Custom Hook
 *
 * Used to update the state of input vuales inside a form
 *
 * @param {object} defaults - An object containing the default values for the form inputs
 */
export default function useForm(defaults) {
    const [values, setValues] = useState(defaults);

    function updateValue(e) {
        let value = e.target.value;

        // Check if value is from a input type number and convert
        if (e.target.type === 'number') {
            value = parseInt(value);
        }

        setValues({
            ...values,
            // overrides actual state with new values
            [e.target.name]: value,
        });
    }

    return { values, updateValue };
}
