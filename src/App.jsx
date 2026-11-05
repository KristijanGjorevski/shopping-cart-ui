import { FaBabyCarriage } from "react-icons/fa";
import ProductList from './components/ProductList';
import UserCart from "./components/UserCart";
import Header from "./components/Header";

const App = () => {

  return (
    <>
      <Header />
      <div className='min-h-screen bg-gray-100 p-6'>
        <h1 className="flex gap-2 text-3xl text-black font-bold mb-6"><FaBabyCarriage /> Product Catalog</h1>
        {/* <UserCart /> */}
        <ProductList />
      </div>
    </>
  )
}

export default App