interface SocketObserverable {
	subscribe(room:string, o: SocketObserver): void;
	unsubscribe(o: SocketObserver, success:(room:string)=>void): void;
	notifyObservers(room:string, value: number): void;
}
interface SocketObserver {
	(log: number): void;
}

interface RoomsObject {
	[key:string]: SocketObserver[]
}
class SocketSource implements SocketObserverable {
	private rooms: RoomsObject = {};

	newLog(room:string, value: number) {
		this.notifyObservers(room, value);
	}
	subscribe(room:string, o: SocketObserver): void {
		this.rooms[room] = this.rooms[room] || [];
		this.rooms[room].push(o);
	}
	unsubscribe(target: SocketObserver, success:(room:string)=>void): void {
		const emptyRooms:string[] = [];
		Object.keys(this.rooms).map(room => {
			this.rooms[room] = this.rooms[room].filter(o => {
				if(o == target){
					success(room);
					return false;
				}
				return true;
			});
			if(this.rooms[room].length === 0){
				emptyRooms.push(room);
			}
		})
		emptyRooms.map(room => delete this.rooms[room]);
	}
	notifyObservers(room:string, value: number): void {
		if(this.rooms[room] === undefined) return;
		this.rooms[room].map((observer:SocketObserver) => observer(value));
	}
}


const LiveData = (Socket:SocketSource, name:string, room:string, max:number = 10) => {
	const handleLog:SocketObserver = (log: number) => {
		console.log(`${name} received ${room} log ${log}`);
		if(log > max){
			Socket.unsubscribe(handleLog, () => console.log(`${name} removed from ${room}`))
		}
	}
	Socket.subscribe(room, handleLog);
}

const MySocket = new SocketSource();
LiveData(MySocket, 'Test1', 'Room1',  60);
LiveData(MySocket, 'TestX', 'Room1',  64);
LiveData(MySocket, 'Test2', 'Room1', 150);
LiveData(MySocket, 'Test3', 'Room3', 600);
MySocket.newLog('Room1', 65);
MySocket.newLog('Room1', 14);
MySocket.newLog('Room1', 65);
MySocket.newLog('Room1', 70);