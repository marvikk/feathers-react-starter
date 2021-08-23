import { action, thunk, debug } from 'easy-peasy';
import feathersClient from './fethersClient';
// import { useStopwatch } from 'react-timer-hook';

// const destructTimer = timerObj => {
//     const {
//         seconds,
//         minutes,
//         hours,
//         isRunning,
//         start,
//         pause,
//         reset,

//     } = useStopwatch({ autoStart: false });

//     return {
//         seconds: seconds,
//         minutes: minutes,
//         hours: hours,
//         isRunning: isRunning,
//         start: start,
//         pause: pause,
//         reset: reset,

//     }
// }

export default {
    stations: [],
    timers: [],
    timerRefs: [],
    // upTimeRef: null,
    // downTimeRef: null,
    //Thunks
    fetchItems: thunk(
        async actions => {
            feathersClient.service('station').timeout = 1000000000;
            let items = await feathersClient.service('station').find({
                query: {
                    //$limit: 10,
                    $sort: {
                        stationName: 1
                    }
                }
            });
            //const stations = items.data; FYI: use it like this if pagination is disabled is service options
            if (items.length == 0) {
                let dummyData = [
                    { "stationName": 0, "programmerName": "Peter Progger", "operatorName": "Sam Smith", "shiftStart": "10:00", "shiftEnd": "18:00", "targetAmount": "123", "status": "Operating", "upTime": "00:31:43", "downTime": "00:00:00" },
                    { "stationName": 1, "programmerName": "Peter Progger", "operatorName": "Sam Smith", "shiftStart": "10:00", "shiftEnd": "18:00", "targetAmount": "123", "status": "Down", "upTime": "00:00:19", "downTime": "00:26:05" },
                    { "stationName": 2, "programmerName": "Peter Progger", "operatorName": "Sam Smith", "shiftStart": "10:00", "shiftEnd": "18:00", "targetAmount": "123", "status": "Down", "upTime": "00:00:19", "downTime": "00:19:49" },
                    { "stationName": 3, "programmerName": "Peter Progger", "operatorName": "Sam Smith", "shiftStart": "10:00", "shiftEnd": "18:00", "targetAmount": "123", "status": "Down", "upTime": "00:00:19", "downTime": "00:19:46" },
                    { "stationName": 4, "programmerName": "Peter Progger", "operatorName": "Sam Smith", "shiftStart": "10:00", "shiftEnd": "18:00", "targetAmount": "123", "status": "Operating", "upTime": "00:28:30", "downTime": "00:00:00" }
                ]
                dummyData.forEach(async item => {
                    await feathersClient.service('station').create(item);
                })
                items = await feathersClient.service('station').find();
            }
            actions.setStations(items);
            // actions.initTimers(items);

            return items;
        }
    ),
    patchItem: thunk(
        async (actions, payload) => {
            feathersClient.service('station').patch(payload[0], payload[1]);
        }
    ),
    //Actions
    addTimer: action((state, payload) => {
        // console.log(payload[0]);
        // console.log(payload[1]);
        // console.log(payload[2]);
        if (typeof state.timers[payload[0]] === 'undefined') {
            state.timers[payload[0]] = {
                upTimer: null,
                downTimer: null
            }
        }
        state.timers[payload[0]][payload[1]] = payload[2];
        console.log(debug(state.timers))
    }),
    // fetchTimers: action((state, payload) => {
    //     return state.timers;
    // }),
    addTimerRef: action((state, payload) => {
        // console.log(payload);
        // console.log(debug(state));
        if (typeof state.timerRefs[payload[0]] === 'undefined') {
            state.timerRefs[payload[0]] = { upTimeRef: payload[1].current, downTimeRef: payload[2].current }
        }
        //console.log(debug(state.timerRefs[payload[0]].upTimeRef));
        // state.timerRefs[payload[0]].upTimeRef.pauseClock();
    }),
    startUpTimer: action((state, payload) => {
        state.timers[payload].upTimer.start()
        //state.timerRefs[payload].upTimeRef.startClock();
    }),
    pauseUpTimer: action((state, payload) => {
        state.timers[payload].upTimer.pause()
    }),
    startDownTimer: action((state, payload) => {
        state.timers[payload].downTimer.start()
    }),
    pauseDownTimer: action((state, payload) => {
        state.timers[payload].downTimer.pause()
    }),
    // initTimers: action((state, payload) => {
    //     if ((payload.length != 0) && (state.timers.length == 0)) {
    //         payload.forEach(
    //             station => {
    //                 state.timers.push(
    //                     {
    //                         stationName: station.stationName,
    //                         downTimeRef: useStopwatch,
    //                         upTimeRef: useStopwatch
    //                     }
    //                 )
    //             }
    //         );
    //         //     console.log(debug(state.timers));
    //     }
    // }),
    addItem: action((state, payload) => {
        console.log('is this sheet async??');
        state.stations.push(payload);
    }),
    setStations: action(
        (state, stations) => {
            state.stations = stations;
        }
    ),
    updateStation: action(
        (state, station) => {

            var elementPos = state.stations.map(function (x) { return x._id; }).indexOf(station._id);
            state.stations[elementPos].status = station.status;
            // console.log(state.stations[elementPos].stationName);
            // console.log(state.stations[elementPos].status)
        }
    ),
    setUpTimeRef: action(
        (state, ref) => {
            state.upTimeRef = ref;
        }
    ),
    setDownTimeRef: action(
        (state, ref) => {
            state.downTimeRef = ref;
        }
    ),
    doSomething: action(
        (state, id) => {
            state.stations.map(
                station => {
                    if (station._id == id) {
                        console.log('Doing smth for item with id: ', id);
                    }
                    return station;
                }
            )
        }
    ),
    removeItem: action(
        (state, id) => {
            state.stations = state.stations.filter(station => station._id !== id);
        }
    )
}