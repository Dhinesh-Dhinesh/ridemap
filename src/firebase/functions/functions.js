import { doc, getDoc } from "firebase/firestore";
import { firestoreDB } from '../firebase';


export const getRoutes = async () => {
    const routesRef = doc(firestoreDB, "busroutes", "route");
    const data = await getDoc(routesRef);

    if (data.exists()) {
        return data.data().value;
    } else {
        console.log("err");
    }
}