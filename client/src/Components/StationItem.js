import React from 'react';
import { useStoreActions } from 'easy-peasy';

const StationItem = ({ station }) => {
    const doThis = useStoreActions(actions => actions.doSomething);
    return (
        <li onClick={() => doThis(station._id)}>{station.stationId}</li>
    )
}

export default StationItem;