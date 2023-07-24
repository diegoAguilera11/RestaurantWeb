import { useEffect, useContext, useState } from "react";
import { FireBaseContext } from "../firebase/FirebaseContext";
import { collection, onSnapshot } from "firebase/firestore";
import { Order } from "../components/Order";


const OrdersPage = () => {

  const { firestore } = useContext(FireBaseContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    obtainOrders(); 
  }, [])

  const obtainOrders = async () => {
    onSnapshot(collection(firestore, "orders"), (querySnapshot) => {

      const orders = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      });
      console.log(orders);
      setOrders(orders);
    });
  }
  return (
    <>
      <h1 className='text-3xl font-semibold text-black mb-4'>Ordenes</h1>

      {orders.map(order => (
        <Order key={order.id} order={order}/>
      ))}
    </>
  )
}

export default OrdersPage