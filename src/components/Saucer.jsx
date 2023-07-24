import { useRef, useContext } from 'react'
import { FireBaseContext } from '../firebase/FirebaseContext';
import { doc, updateDoc} from "firebase/firestore";

export const Saucer = ({ saucer }) => {

    const { firestore } = useContext(FireBaseContext)
    const { id ,name, price, description, image, category, state } = saucer;

    const stateRef = useRef(saucer.state);

    const updateState = async () => {

        try {
            const saucerRef = doc(firestore, 'products', id)
            await updateDoc(saucerRef, {state: stateRef.current.value });
        } catch (error) {
            alert('La acción no se pudo llevar acabo')
            console.log(error);
        }
    }
    return (
        <div className="w-full px-3 mb-4">
            <div className='p-5 shadow-md bg-white'>
                <div className='lg:flex'>
                    <div className='lg:w-5/12 xl:w-3/12'>
                        <img src={image} alt={`image-${name}`} />

                        <div className='sm:flex sm:-mx-2 pl-2'>
                            <label className='block mt-5 sm:w-2/4'>
                                <span className='block text-gray-800 mb-2'>Stock</span>
                                <select className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none'
                                    value={state}
                                    ref={stateRef}
                                    onChange={() => updateState()}
                                >
                                    <option value="true">Disponible</option>
                                    <option value="false">No Disponible</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className='lg:w-7/12 xl:w-9/12 pl-5'>
                        <p className='font-bold text-2xl text-blue-600 mb-4'>{name}</p>
                        <p className='text-gray-600 mb-4'> Categoría: {''}
                            <span className='text-gray-700 font-bold uppercase'>{category}</span>
                        </p>

                        <p className='text-gray-700 mb-4'>{description}</p>

                        <p className='text-gray-600 mb-4'> Precio: {''}
                            <span className='text-gray-700 font-bold uppercase'>{price}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
