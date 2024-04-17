import React from 'react';
import { getRooms } from './firebase';

function useRooms() {
    const [rooms, setRooms] = React.useState([]);

    React.useEffect(() => {
        const unsubscribe = getRooms( setRooms);

        return unsubscribe;
    }, []);

    return rooms;
}

export { useRooms };
