import React, { useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Button from 'react-bootstrap/Button';
import Clock from './Timer';
import { useStopwatch } from 'react-timer-hook';
import feathersClient from '../fethersClient';

const StationItem = ({ station }) => {
    // const {
    //     seconds,
    //     minutes,
    //     hours,
    //     days,
    //     isRunning,
    //     start,
    //     pause,
    //     reset,
    // } = useStopwatch({ autoStart: false });
    // const upCounter = useStopwatch({ autoStart: false });
    // const downCounter = useStopwatch({ autoStart: false });

    const { status, stationName, programmerName, operatorName, targetAmount, upTime, downTime, _id } = station;
    //{ "stationName": 1, "programmerName": "Peter Progger", "operatorName": "Sam Smith", "shiftStart": "10:00", "shiftEnd": "18:00", "targetAmount": "123", "status": "Operating", "upTime": "00:31:43", "downTime": "00:00:00" },
    // const addTimerRef = useStoreActions(actions => actions.addTimerRef);
    // const setDownTimeRef = useStoreActions(actions => actions.setDownTimeRef);
    // const setUpTimeRef = useStoreActions(actions => actions.setUpTimeRef);
    const patchItem = useStoreActions(actions => actions.patchItem);
    const updateStation = useStoreActions(actions => actions.updateStation);

    // const addItem = useStoreActions(actions => actions.addItem);
    // const upTimeRef = useRef();
    // const downTimeRef = useRef();
    // const startDownTimer = useStoreActions(actions => actions.startDownTimer);
    // const startUpTimer = useStoreActions(actions => actions.startUpTimer);
    const timers = useStoreState(state => state.timers);

    // let counter = 0;
    // const increment = () => {
    //     counter++;
    //     return upCounter;
    // }

    useEffect(() => {
        // console.log('station with id ' + station.stationName + ' was rendered')
        // addTimerRef([stationName, upTimeRef, downTimeRef]);
        // if (1) {
        //     //let mayBeCopyOfTimers = fetchTimers();
        //     //mayBeCopyOfTimers = 'ass';
        //     feathersClient.service('station').on('patched', patchedStation => {
        //         if (station.stationName == patchedStation.stationName) {
        //             updateStation(patchedStation);
        //             if (patchedStation.status == 'Operating') {
        //                 //console.log(increment());
        //                 increment().start();
        //                 // setInterval(console.log(increment()), 1000);
        //                 // downCounter.pause();
        //                 // upCounter.start();
        //             } else if (patchedStation.status == 'Down') {
        //                 increment().pause();
        //                 // downCounter.start();
        //             }
        //         }
        //     })
        // }
    }, []);

    // const setRefs = (ut, dt) => {
    //     //console.log(ut, dt)
    //     setDownTimeRef(dt);
    //     setUpTimeRef(ut);
    // }

    const expandBtnClicked = station => {
        return null;
    }

    const resetBtnClicked = station => {
        patchItem([_id, { status: '', downTime: '0.0.0', upTime: '0.0.0' }]);
    }

    const startBtnClicked = station => {
        // upCounter.start();
        // downCounter.pause();
        // const { start } = timers[station.stationName].upTimeRef({ autoStart: false });
        // console.log(timers);
        // start();
        // addItem();
        // addTimerRef([stationName, upTimeRef, downTimeRef]);

        patchItem([_id, { status: 'Operating' }]);
        // startUpTimer(station.stationName);
        // downTimeRef.current.pauseClock();
        // upTimeRef.current.startClock();
        // console.log(timers[stationName]);
        //timers[stationName].start();
        // setTimeout(() => {
        //     timers[stationName].pause();
        //     timers[stationName].start();
        // }, 5000);
        //console.log(timers[stationName]);
    }
    const stopBtnClicked = station => {
        // downCounter.start();
        // upCounter.pause();
        // console.log(timers[stationName]);
        //timers[stationName].pause();
        patchItem([_id, { status: 'Down' }]);
        // startDownTimer(station.stationName);

    }
    const endBtnClicked = station => {
        return null;
    }

    if (1) {
        let time = new Date();
        time.setSeconds(time.getSeconds() + 600);
        return (
            <div>
                <div>
                    <Button variant='info' style={{ width: '49%', marginBottom: '5px' }} onClick={() => expandBtnClicked(station)}>Expand</Button>
                    <Button variant='secondary' style={{ width: '49%', marginBottom: '5px' }} onClick={() => resetBtnClicked(station)}>Reset</Button>
                    <h2>Station {stationName}</h2>

                    <h4>
                        <span>Status:</span>
                        <div style={{ display: 'inline-block' }}> {status}</div>
                    </h4>

                    <div className="form-group">
                        <div className="inputGroupContainer">
                            <div className="input-group">
                                <input name="stationId" placeholder="ID" className="form-control" type="hidden" value="" />
                            </div>
                            <div>
                                <span>Programmer:</span>
                                <div id='pname${stName}' style={{ display: 'inline-block' }}>{programmerName}</div>
                            </div>
                            <div>
                                <span>Operator:</span>
                                <div id='oname${stName}' style={{ display: 'inline-block' }}>{operatorName}</div>
                            </div>
                            <div>
                                <span>Target Amount:</span>
                                <div id='tamount${stName}' style={{ display: 'inline-block' }}>{targetAmount}</div>
                            </div>
                            <div>
                                <span>Up Time:</span>
                                <div id='upTimer${stName}' style={{ display: 'inline-block' }}>
                                    <Clock stationName={stationName} status={status} upTime={upTime} downTime={downTime} timerType={'upTimer'} />
                                    {/* <Clock stationName={stationName} seconds={upCounter.seconds} minutes={upCounter.minutes} hours={upCounter.hours} /> */}
                                    {/* <div>
                                        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
                                    </div> */}
                                </div>
                            </div>
                            <div>
                                <span>Down Time:</span>
                                <div id='downTimer${stName}' style={{ display: 'inline-block' }}>
                                    <Clock stationName={stationName} status={status} upTime={upTime} downTime={downTime} timerType={'downTimer'} />
                                    {/* <Clock stationName={stationName} seconds={downCounter.seconds} minutes={downCounter.minutes} hours={downCounter.hours} /> */}
                                    {/* <Clock ref={downTimeRef} useStopwatch={useStopwatch.downTimeRef} timeValue={downTime} timeType="downTime" id={_id} /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div >

                <Button variant='success' style={{ width: '49%', marginBottom: '5px' }} id="startBtn${stName}" onClick={() => startBtnClicked(station)}>Start</Button>
                <Button variant='danger' style={{ width: '49%', marginBottom: '5px' }} id="stopBtn${stName}" onClick={() => stopBtnClicked(station)}>Stop</Button>
                <Button variant='primary' style={{ width: '100%', marginBottom: '5px' }} id="endBtn${stName}" >End Shift</Button>
            </div>
        )
    } else {
        return null;
    }

}

// function MyStopwatch() {
//     const {
//         seconds,
//         minutes,
//         hours,
//         days,
//         isRunning,
//         start,
//         pause,
//         reset,
//     } = useStopwatch({ autoStart: true });


//     return (
//         <div style={{ textAlign: 'center' }}>
//             <h1>react-timer-hook</h1>
//             <p>Stopwatch Demo</p>
//             <div style={{ fontSize: '100px' }}>
//                 <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
//             </div>
//             <p>{isRunning ? 'Running' : 'Not running'}</p>
//             <button onClick={start}>Start</button>
//             <button onClick={pause}>Pause</button>
//             <button onClick={reset}>Reset</button>
//         </div>
//     );
// }

// export default function App() {
//     return (
//         <div>
//             <MyStopwatch />
//         </div>
//     );
// }


export default StationItem;