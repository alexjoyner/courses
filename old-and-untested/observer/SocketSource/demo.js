const rooms = {};

const subscribe = (room, func) => {
  if(!rooms[room]){
    // Create Room
    console.log(`Creating ${room}`)
    rooms[room] = [];
  }
  rooms[room].push(func)
  console.log(`${room} ${rooms[room].length} members`)
}

const unsubscribe = (target) => {
  const emptyRooms = [];
  Object.keys(rooms).map(room => {
    rooms[room] = rooms[room].filter(func => {
      if(func == target){
        console.log(`Romoving from ${room}`);
        return false;
      }
      return true;
    })
    console.log(`${room} ${rooms[room].length} members`)
    if(rooms[room].length === 0){
      emptyRooms.push(room);
    }
  })
  console.log('Empty Rooms: ', emptyRooms);
  emptyRooms.map(room => delete rooms[room]);
}

const notify = (room, val) => {
  if(rooms[room] === undefined) return;
  rooms[room].map(func => func(val));
}

const Test = (room, name, killDelay) => {
  const cb = (val) => {
    console.log(`Testing ${name} : ${val}`);
  }
  subscribe(room, cb);
  if(killDelay){
    setTimeout(() => unsubscribe(cb), killDelay);
  }
}

Test('Room1', 'Ron', 1000);
Test('Room1', 'Tom');
Test('Room2', 'Bill', 3000);

setTimeout(() => notify('Room1', 12), 1000);
setTimeout(() => notify('Room1', 24), 2000);
setTimeout(() => notify('Room1', 36), 3000);
setTimeout(() => notify('Room1', 48), 4000);
setTimeout(() => notify('Room1', 57), 5000);
setTimeout(() => notify('Room1', 68), 6000);
setTimeout(() => notify('Room1', 96), 7000);
