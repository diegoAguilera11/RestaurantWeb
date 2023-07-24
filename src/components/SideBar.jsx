
import { NavLink } from 'react-router-dom'


const SideBar = () => {
  // const currentUrl = useLocation().pathname;
  // console.log(currentUrl);
  return (
    <div className="md:w-2/5 xl:w-1/5 bg-gray-500">
      <div className="p-6">
        <p className="uppercase text-2xl tracking-wide font-bold text-center text-white">Restaurant Juanita</p>
        {/* <p className="mt-3 text-gray-400 text-lg font-semibold">Administra el restaurant con las siguientes opciones:</p> */}
        <nav className='mt-10'>
          {/* className={`${currentUrl} === '/' ? 'text-yellow-400' : 'text-gray-400'`} */}
          <NavLink className="p-1 text-white block hover:bg-yellow-500 hover:text-gray-900 transition-all font-semibold" exact="true" to="/">Ordenes</NavLink>
          <NavLink to="/menu" className="p-1 text-white block hover:bg-yellow-500 hover:text-gray-900 transition-all font-semibold">Menu</NavLink>
        </nav>
      </div>
    </div>
  )
}

export default SideBar