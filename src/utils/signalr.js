import * as signalR from '@microsoft/signalr';
import { HOST,HUB_PREFIX,RECEIVE_METHOD_PREFIX } from '../constraints/connection-const';
const connection = new signalR.HubConnectionBuilder()
    .withUrl(`${HOST}/${HUB_PREFIX}`)
    .configureLogging(signalR.LogLevel.Information)
    .build();

connection.on(`${RECEIVE_METHOD_PREFIX}`, (user, message) => {
    console.log(`Message from ${user}: ${message}`);
});

connection.start().catch(err => console.error(err.toString()));

export default connection;
