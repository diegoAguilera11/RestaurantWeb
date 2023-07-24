import { createContext } from "react";
import { firebaseConfig } from './config'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';


const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export const FireBaseContext = createContext();


export const uploadFile = async (file) => {
  const storageRef = ref(storage, v4())
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}


// Crea un componente de proveedor que envuelve tu aplicación con el contexto de Firebase
// eslint-disable-next-line react/prop-types
export const FirebaseProvider = ({ children }) => {
  return (
    <FireBaseContext.Provider value={{ firestore }}>
      {children}
    </FireBaseContext.Provider>
  );
};