"use strict";
class SocketSource {
    constructor() {
        this.rooms = {};
    }
    newLog(room, value) {
        this.notifyObservers(room, value);
    }
    subscribe(room, o) {
        this.rooms[room] = this.rooms[room] || [];
        this.rooms[room].push(o);
    }
    unsubscribe(target, success) {
        const emptyRooms = [];
        Object.keys(this.rooms).map(room => {
            this.rooms[room] = this.rooms[room].filter(o => {
                if (o == target) {
                    success(room);
                    return false;
                }
                return true;
            });
            if (this.rooms[room].length === 0) {
                emptyRooms.push(room);
            }
        });
        emptyRooms.map(room => delete this.rooms[room]);
    }
    notifyObservers(room, value) {
        if (this.rooms[room] === undefined)
            return;
        this.rooms[room].map((observer) => observer(value));
    }
}
const LiveData = (Socket, name, room, max = 10) => {
    const handleLog = (log) => {
        console.log(`${name} received ${room} log ${log}`);
        if (log > max) {
            Socket.unsubscribe(handleLog, () => console.log(`${name} removed from ${room}`));
        }
    };
    Socket.subscribe(room, handleLog);
};
const MySocket = new SocketSource();
LiveData(MySocket, 'Test1', 'Room1', 60);
LiveData(MySocket, 'TestX', 'Room1', 64);
LiveData(MySocket, 'Test2', 'Room1', 150);
LiveData(MySocket, 'Test3', 'Room3', 600);
MySocket.newLog('Room1', 65);
MySocket.newLog('Room1', 14);
MySocket.newLog('Room1', 65);
MySocket.newLog('Room1', 70);
//# sourceMappingURL=index.js.map