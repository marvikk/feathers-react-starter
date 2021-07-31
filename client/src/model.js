import { action, thunk } from 'easy-peasy';
import feathersClient from './fethersClient';

export default {
    stations: [

    ],
    //Thunks
    fetchItems: thunk(
        async actions => {
            let items = await feathersClient.service('station').find({
                query: {
                    //$limit: 10,
                    $sort: {
                        stationId: 1
                    }
                }
            });
            //const stations = items.data; FYI: use it like this if pagination is disabled is service options
            if (items.length == 0) {
                let dummyData = [
                    { "stationId": 1, "programmerName": "Peter Progger", "operatorName": "Sam Smith", "shiftStart": "10:00", "shiftEnd": "18:00", "targetAmount": "123", "status": "Operating", "upTime": "00:31:43", "downTime": "00:00:00" },
                    { "stationId": 2, "programmerName": "Peter Progger", "operatorName": "Sam Smith", "shiftStart": "10:00", "shiftEnd": "18:00", "targetAmount": "123", "status": "Down", "upTime": "00:00:19", "downTime": "00:26:05" },
                    { "stationId": 3, "programmerName": "Peter Progger", "operatorName": "Sam Smith", "shiftStart": "10:00", "shiftEnd": "18:00", "targetAmount": "123", "status": "Down", "upTime": "00:00:19", "downTime": "00:19:49" },
                    { "stationId": 4, "programmerName": "Peter Progger", "operatorName": "Sam Smith", "shiftStart": "10:00", "shiftEnd": "18:00", "targetAmount": "123", "status": "Down", "upTime": "00:00:19", "downTime": "00:19:46" },
                    { "stationId": 5, "programmerName": "Peter Progger", "operatorName": "Sam Smith", "shiftStart": "10:00", "shiftEnd": "18:00", "targetAmount": "123", "status": "Operating", "upTime": "00:28:30", "downTime": "00:00:00" }
                ]
                dummyData.forEach(async item => {
                    await feathersClient.service('station').create(item);
                })
                items = await feathersClient.service('station').find();
            }
            actions.setStations(items);

            return items;
        }
    ),
    //Actions
    addItem: action((state, payload) => {
        console.log('is this sheet async??');
        state.stations.push(payload);
    }),
    setStations: action(
        (state, stations) => {
            state.stations = stations;
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