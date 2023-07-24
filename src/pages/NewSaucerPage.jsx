import { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FireBaseContext, uploadFile } from '../firebase/FirebaseContext';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const NewSaucerPage = () => {

  // Context con las operaciones de firebase;
  const { firestore } = useContext(FireBaseContext);
  const [file, setFile] = useState('');

  // Hook Para redireccionar
  const navigate = useNavigate();

  // Validar datos del formulario
  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      category: '',
      image: '',
      description: ''
    },
    //Validar los campos
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, 'El nombre del platillo debe tener como minimo 3 caracteres')
        .required('El campo Nombre es obligatorio'),
      price: Yup.number()
        .min(1, 'Ingrese un número')
        .required('El Precio es obligatorio'),
      category: Yup.string()
        .required('El campo categoría es obligatorio'),
      description: Yup.string()
        .required('El campo Descripción es obligatorio')
        .min(10, 'La Descripción debe ser más larga')
    }),
    onSubmit: data => {
      addProduct(data);
    }
  });

  const uploadImage = async (file) => {
    try {
      const response = await uploadFile(file);
      return response;
    } catch (error) {
      alert('Error al subir la imagen');
    }
  }

  const addProduct = async (data) => {
    try {
      const productsRef = collection(firestore, 'products');
      const response = await uploadImage(file);
      data.image = response;
      data.state = true;
      await addDoc(productsRef, data);
      console.log('Registro agregado correctamente');

      //Redireccionar
      navigate('/menu');

    } catch (error) {
      alert('oops...')
      console.log(error);
    }
  }

  return (
    <>
      <h1 className='text-3xl font-semibold text-black mb-4'>Nuevo Platillo</h1>

      <div className="flex justify-center mt-10">
        <div className="w-full max-w-3xl">
          <form
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nombre</label>
              <input
                className="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Nombre Platillo"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {(formik.touched.name && formik.errors.name) &&
              <div className='bg-red-100 border-l-4 border-red-500 rounded-sm text-red-700 p-4' role='alert'>
                <p className='font-bold'>{formik.errors.name}</p>
              </div>
            }

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Precio</label>
              <input
                className="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="number"
                min="0"
                placeholder="$1000"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {(formik.touched.price && formik.errors.price) &&
              <div className='bg-red-100 border-l-4 border-red-500 rounded-sm text-red-700 p-4' role='alert'>
                <p className='font-bold'>{formik.errors.price}</p>
              </div>
            }

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Categoría</label>
              <select
                className="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">--Seleccione--</option>
                <option value="desayuno">Desayuno</option>
                <option value="comida">Comida</option>
                <option value="cena">Cena</option>
                <option value="bebida">Bebida</option>
                <option value="postre">Postre</option>
                <option value="ensalada">Ensalada</option>
              </select>
            </div>

            {(formik.touched.category && formik.errors.category) &&
              <div className='bg-red-100 border-l-4 border-red-500 rounded-sm text-red-700 p-4' role='alert'>
                <p className='font-bold'>{formik.errors.category}</p>
              </div>
            }

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Imagen</label>
              {/* <input type='file' id='image' onChange={(e) => uploadFile(e.target.files[0])}/> */}
              <input type='file' id='image' onChange={(e) => setFile(e.target.files[0])}/>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Descripción</label>
              <textarea
                className="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none h-40"
                rows="4"
                cols="50"
                id="description"
                placeholder="Descripción del platillo..."
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
            </div>

            {(formik.touched.description && formik.errors.description) &&
              <div className='bg-red-100 p-4 border-l-4 border-red-500 text-red-700 rounded-sm' role='alert'>
                <p className='font-bold'>{formik.errors.description}</p>
              </div>
            }
            <input
              type="submit"
              className="bg-gray-600 hover:bg-gray-800 w-full mt-5 p-2 transition-all text-white uppercase font-bold cursor-pointer"
              value="Agregar Platillo"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default NewSaucerPage