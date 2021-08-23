import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import StationItem from './StationItem';
import feathersClient from '../fethersClient';

const Stations = () => {
    const stations = useStoreState(state => state.stations);
    //const timers = useStoreState(state => state.timers);
    // const upTimeRef = useStoreState(state => state.upTimeRef);
    //const timeRefs = useStoreState(state => state.timeRefs);
    const fetchStations = useStoreActions(actions => actions.fetchItems);
    //const fetchTimers = useStoreActions(actions => actions.fetchTimers);

    // const initTimers = useStoreActions(actions => actions.initTimers);

    const updateStation = useStoreActions(actions => actions.updateStation);
    // const startUpTimer = useStoreActions(actions => actions.startUpTimer);
    // const startDownTimer = useStoreActions(actions => actions.startDownTimer);
    // const pauseUpTimer = useStoreActions(actions => actions.pauseUpTimer);
    // const pauseDownTimer = useStoreActions(actions => actions.pauseDownTimer);


    const timers = useStoreState(state => state.timers);

    useEffect(
        () => {

            if (stations.length === 0) {
                fetchStations();
            };
            // if (timers.length === 0) {
            //     initTimers(stations);
            // }
        }, []
    )
    useEffect(() => {
        feathersClient.service('station').on('custom event', emittedData => {
            console.log(emittedData);
        });
        if (timers.length != 0) {
            //let mayBeCopyOfTimers = fetchTimers();
            //mayBeCopyOfTimers = 'ass';
            feathersClient.service('station').on('patched', patchedStation => {
                updateStation(patchedStation);
                if (patchedStation.status == 'Operating') {
                    timers[patchedStation.stationName].upTimer.start();
                    timers[patchedStation.stationName].downTimer.pause();
                    // setInterval(console.log(timers[patchedStation.stationName].upTimer), 1000);
                    // startUpTimer(patchedStation.stationName);
                    // pauseDownTimer(patchedStation.stationName);
                } else if (patchedStation.status == 'Down') {
                    timers[patchedStation.stationName].upTimer.pause();
                    timers[patchedStation.stationName].downTimer.start();
                    // timers[patchedStation.stationName].upTimer.pause();
                    // startDownTimer(patchedStation.stationName);
                    // pauseUpTimer(patchedStation.stationName);
                }
            });
        }


        return () => {
            // Clean up listeners
            // feathersClient.service('station').removeListener('patched', fetchStations);
        };
    }, [timers])
    // if ((timers.length !== 0) && (stations.length !== 0)) {
    if (1) {
        return (
            <div className="my-frame">
                {
                    stations.map(station => {
                        // let upCounter = FuckingFunction(null)
                        // let downCounter = FuckingFunction(null);
                        // const timerIndex = timers.map(function (x) { return x.stationName; }).indexOf(station.stationName);
                        // const timer = timers[station.stationName];
                        return (<div key={station._id} className={['station',
                            station.status == 'Operating' ? 'operating' : null,
                            station.status == 'Down' ? 'down' : null,
                            //station.status == 
                        ].join(" ")}>
                            {/* <StationItem station={station} useStopwatch={timer} /> */}
                            <StationItem station={station} />

                            {/* <Button variant="info" onClick={async () => { await feathersClient.service('station').patch(station._id, { status: 'Operating' }) }}>Lux Theme Button</Button> */}
                        </div>)
                    })
                }
            </div>

        )
    } else {
        return null;
    }

}

export default Stations;