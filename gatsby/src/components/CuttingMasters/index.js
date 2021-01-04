import React from 'react';

const CuttingMasters = ({ masters }) => {
    console.log(masters);
    return (
        <div>
            <h2 className="mb-2">Pizza Masters currently slicing</h2>

            {masters && masters.map(master => <h3>{master.name}</h3>)}
        </div>
    );
};

export default CuttingMasters;
