var SocketSource = /** @class */ (function () {
    function SocketSource() {
        this.rooms = {};
    }
    SocketSource.prototype.newLog = function (room, value) {
        this.notifyObservers(room, value);
    };
    SocketSource.prototype.subscribe = function (room, o) {
        this.rooms[room] = this.rooms[room] || [];
        this.rooms[room].push(o);
    };
    SocketSource.prototype.unsubscribe = function (target, success) {
        var _this = this;
        var emptyRooms = [];
        Object.keys(this.rooms).map(function (room) {
            _this.rooms[room] = _this.rooms[room].filter(function (o) {
                if (o == target) {
                    success(room);
                    return false;
                }
                return true;
            });
            if (_this.rooms[room].length === 0) {
                emptyRooms.push(room);
            }
        });
        emptyRooms.map(function (room) { return delete _this.rooms[room]; });
    };
    SocketSource.prototype.notifyObservers = function (room, value) {
        if (this.rooms[room] === undefined)
            return;
        this.rooms[room].map(function (observer) { return observer(value); });
    };
    return SocketSource;
}());
var LiveData = function (Socket, name, room, max) {
    if (max === void 0) { max = 10; }
    var handleLog = function (log) {
        console.log(name + " received " + room + " log " + log);
        if (log > max) {
            Socket.unsubscribe(handleLog, function () { return console.log(name + " removed from " + room); });
        }
    };
    Socket.subscribe(room, handleLog);
};
var MySocket = new SocketSource();
LiveData(MySocket, 'Test1', 'Room1', 60);
LiveData(MySocket, 'TestX', 'Room1', 64);
LiveData(MySocket, 'Test2', 'Room1', 150);
LiveData(MySocket, 'Test3', 'Room3', 600);
MySocket.newLog('Room1', 65);
MySocket.newLog('Room1', 14);
MySocket.newLog('Room1', 65);
MySocket.newLog('Room1', 70);
