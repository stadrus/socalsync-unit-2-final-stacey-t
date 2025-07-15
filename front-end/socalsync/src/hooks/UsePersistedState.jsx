import { useEffect, useState } from "react";
import { getItem, setItem } from "../utils/localStorage";
/*This component is used to persist data from the user typed in the EventTable*/
/*Reference Code source: https://medium.com/@roman_j/mastering-state-persistence-with-local-storage-in-react-a-complete-guide-1cf3f56ab15c*/
function usePersistedState  (key, intialValue){
    const [state, setState] = useState  (() => {
        return getItem(key) ?? intialValue;
    });

    useEffect(() => {
        setItem(key, state);
    }, [key, state]);
    return [state, setState];
}
export default usePersistedState; 