import { useEffect, useState, useContext } from 'react'
import { collection, onSnapshot } from "firebase/firestore";
import { Link } from 'react-router-dom'
import { FireBaseContext } from '../firebase/FirebaseContext'
import { Saucer } from '../components/Saucer';


const MenuPage = () => {

  const { firestore } = useContext(FireBaseContext);
  const [saucers, setSaucers] = useState([]);

  useEffect(() => {
    obtainSaucer();
  }, [])


  const obtainSaucer = async () => {
    onSnapshot(collection(firestore, "products"), (querySnapshot) => {

      const saucers = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      });
      console.log(saucers);
      setSaucers(saucers);
    });
  }

  return (
    <>
      <h1 className='text-3xl font-semibold text-black mb-4'>Menú</h1>
      <Link to="/new-saucer" className='bg-blue-800 rounded-sm hover:bg-blue-500 transition-all uppercase mb-5 p-2 text-white font-bold'>
        Agregar Platillo
      </Link>
      {saucers.map(saucer => (
        <Saucer key={saucer.id} saucer={saucer} />
      ))}
    </>
  )
}

export default MenuPage