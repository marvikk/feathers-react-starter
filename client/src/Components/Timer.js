import React, { forwardRef, useImperativeHandle, useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
// import { useStopwatch } from 'react-timer-hook';
import useTimer from 'easytimer-react-hook';


// const MyTime = forwardRef(({ timeValue, timeType, id, useStopwatch }, ref) => {
const MyTime = ({ stationName, timerType, status, upTime, downTime }) => {
    //const patchItem = useStoreActions(actions => actions.patchItem);
    //const patchItem = useStoreActions(actions => actions.patchItem);
    const addTimer = useStoreActions(actions => actions.addTimer);
    const [epicObject, configShit] = useTimer({
        startValues:
            timerType == 'upTimer' ? { hours: upTime.split(':')[0], minutes: upTime.split(':')[1], seconds: upTime.split(':')[2] } : { hours: downTime.split(':')[0], minutes: downTime.split(':')[1], seconds: upTime.split(':')[2] }
    });

    // const timeArray = timeValue.split(":")
    // const stopwatchOffset = new Date();
    // stopwatchOffset.setHours(stopwatchOffset.getHours() + parseInt(timeArray[0]));
    // stopwatchOffset.setMinutes(stopwatchOffset.getMinutes() + parseInt(timeArray[1]));
    // stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + parseInt(timeArray[2]));
    const timers = useStoreState(state => state.timers);

    // const {
    //     seconds,
    //     minutes,
    //     hours,
    //     isRunning,
    //     start,
    //     pause,
    //     reset,

    // } = useStopwatch({ autoStart: false, offsetTimestamp: stopwatchOffset });

    useEffect(() => {
        // const epicObject = {
        //     seconds: seconds,
        //     minutes: minutes,
        //     hours: hours,
        //     isRunning: isRunning,
        //     start: start,
        //     pause: pause,
        //     reset: reset,
        // }
        // // const obj = useStopwatch()
        // console.log('rerendered');
        // // console.log(obj);
        addTimer([stationName, timerType, epicObject]);
        if (status == 'Operating' && timerType == 'upTimer') {
            epicObject.start();
        } else if (status == 'Down' && timerType == 'downTimer') {
            epicObject.start();
        }
    }, [])

    // useEffect(() => {
    //     if (isRunning) {
    //         let tmp = {};
    //         tmp[timeType] = `${hours}:${minutes}:${seconds}`;
    //         patchItem([id, tmp]);
    //         console.log(tmp);
    //     }
    // }, [seconds])

    // useImperativeHandle(ref, () => ({
    //     startClock() {
    //         start();
    //     },
    //     pauseClock() {
    //         pause();
    //     },
    //     resetClock() {
    //         reset();
    //     }
    // }));

    if (1) {
        return (
            <div>
                {/* <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span> */}
                {epicObject.getTimeValues().toString()}
            </div>
        );
    } else {
        return <div>ass</div>
    }


}

export default MyTime;