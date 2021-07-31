import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import StationItem from './StationItem';
import feathersClient from '../fethersClient';
import Button from 'react-bootstrap/Button';


const Stations = () => {
    const stations = useStoreState(state => state.stations);
    const fetchStations = useStoreActions(actions => actions.fetchItems);
    const addItem = useStoreActions(actions => actions.addItem);
    useEffect(
        () => {
            fetchStations().then(
                (stations) => {
                    console.log(stations);
                }
            );
            feathersClient.service('station').on('patched', (patchedItem) => {
                console.log(patchedItem);
            });
            //     return () => {
            //         // Clean up listeners
            //         // feathersClient.service('station').on('created');
            //     };
        }, []
    )

    return (
        <div>
            <ul>
                {
                    stations.map(station => (
                        <div key={station._id}>
                            <StationItem station={station} />
                            <Button variant="info" onClick={async () => { await feathersClient.service('station').patch(station._id, { status: 'Operating' }) }}>Lux Theme Button</Button>
                        </div>
                    ))
                }
            </ul>

        </div>

    )
}

export default Stations;