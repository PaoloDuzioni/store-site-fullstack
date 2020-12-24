import React from 'react';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

function createPatchFrom(value) {
    return PatchEvent.from(value === '' ? unset() : set(Number(value)));
}

const formatMoney = Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
}).format;

const styles = {
    padding: '10px',
    border: '2px solid #800',
};

const PriceInput = ({ markers, type, value, onChange, inputComponent }) => {
    return (
        <div style={markers.length !== 0 ? styles : null}>
            <h2>
                {type.title}
                {value ? ` - ${formatMoney(value)}` : ' - Insert a price'}
            </h2>
            <small>{type.description}</small>
            <input
                type={type.name}
                value={value}
                onChange={event =>
                    onChange(createPatchFrom(event.target.value))
                }
                ref={inputComponent}
            />

            {markers.length !== 0 &&
                type.validation.map(rule => <p>{rule._message}</p>)}
        </div>
    );
};

PriceInput.focus = function () {
    this._inputElement.focus();
};

export default PriceInput;
