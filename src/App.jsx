import { useState, useEffect,useRef ,useMemo,useReducer} from "react";
import "./App.css";
import {Routes,Route,Link} from "react-router-dom";
import Cart from "./cart";
import useStore from "./store";
import { carReducer } from "./carReducer";
import withActionGuard from "./hoc/withActionGuard";//Authentication (Hoc)
import CarList from "./carList";
// import Parent from "./components/parent";

function App() {
    

    // const {allCars, setAllCars, cart, setCart} = useStore();
    const { cart, setCart} = useStore();


  // const [cars, setCars] = useState(()=>{
  //   const storedCars = localStorage.getItem("cars");
  //   return storedCars ? JSON.parse(storedCars):[];
  // });
const GuardedCarList = withActionGuard(CarList);
  //cart
//   const [cart, setCart] = useState(() => {
//   const storedCart = localStorage.getItem("cart");
//   return storedCart ? JSON.parse(storedCart) : [];
// });

//using useReducer 
const initialState = JSON.parse(localStorage.getItem("cars"))||[];
    const [allCars,dispatch] = useReducer(carReducer,initialState);
    

  const handleSelect=(car)=>{
    setCart([...cart,car]);
  };

  const [formData, setFormData] = useState({
    name: "",
    model: "",
    brand: ""
  });

  const [editId, setEditId] = useState(null);

  useEffect (()=>{
    localStorage.setItem("cars",JSON.stringify(allCars));
  }, [allCars]);

//for cart 
// useEffect(()=>{
//   localStorage.setItem("cart", JSON.stringify(cart));
// },[cart]);


 
  // Handle input change
  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value
    });
  };

  const handleEdit = (car) => {
  setFormData({
    name: car.name,
    model: car.model,
    brand: car.brand,
  });

  setEditId(car.id);
};


  // Handle form submit
  const handleSubmit = (e) => {
  e.preventDefault();

  if (editId) {
    // UPDATE
    // const updatedCars = allcars.map((car) =>
    //   car.id === editId ? { ...formData, id: editId } : car
    // );

    // setCars(updatedCars);
    // const updatedCars = allCars.map((car) =>
    //   car.id === editId ? { ...formData, id: editId } : car
    // );
    dispatch({type:"UPDATE_CAR",
      payload: {id: editId,...formData}});


    // setAllCars(updatedCars);
    setEditId(null);
  } else {
    // ADD
    const newCar = {
      id: Date.now(),
      ...formData,
    };

    // setCars([...cars, newCar]);
    // setAllCars([...allCars, newCar]);
    dispatch({type:"ADD_CAR",payload:newCar});

  }

  // Clear form
  setFormData({
    name: "",
    model: "",
    brand: "",
  });
};


  // Delete
  // const handleDelete = (id) => {
  //   setAllCars(allCars.filter(car => car.id !== id));
  // };
  const handleDelete = (id) => {
  dispatch({
    type: "DELETE_CAR",
    payload: id
  });
};

//Search 
const [search , setSearch]=useState("");

const searchRef = useRef(null);
useEffect(()=>{
  searchRef.current.focus();
},[]);
//useMemo for the filtering
const filteredCars = useMemo(()=>{
return allCars.filter( cars =>
  cars.name.toLowerCase().includes(search.toLowerCase()) ||
    cars.model.toLowerCase().includes(search.toLowerCase()) ||
    cars.brand.toLowerCase().includes(search.toLowerCase())

);
},
[allCars,search]);
//current badlaav
console.log("All Cars:",allCars);
console.log("Filtered Cars:",filteredCars);

//current change
const handleRemoveFromCart = (id) => {
  setCart(prevCart => prevCart.filter(item => item.id !== id));
};

//dropdown
const [showDropdown, setShowDropdown] = useState(false);

//useRef for drop down
const dropDownRef = useRef(null);
useEffect(()=>{
function handleClickOutside(event){
  if(dropDownRef.current && !dropDownRef.current.contains(event.target)){
    setShowDropdown(false);
  }
}
document.addEventListener("mousedown",handleClickOutside);
return()=>{
  document.removeEventListener("mousedown",handleClickOutside);
};
},[]);

  return (
    <div>
<header>
  <div className="navbar">
    <div className="nav-left">
   <input 
   ref={searchRef}
   type="text" placeholder="Search for the dream car you want"
   value={search} onChange={(e)=>
    setSearch(e.target.value)
   }/></div>
    <div className="nav-right">
  <div className="cart-wrapper" ref={dropDownRef}>
  <span
    className="cart-label"
    onClick={() => setShowDropdown(prev => !prev)}
  >
    Cart ({cart.length})
  </span>

  {showDropdown && (
    <div className="cart-dropdown">
      {cart.length === 0 ? (
        <p className="empty-text">Cart is empty 🚗</p>
      ) : (
        <>
          {cart.map(item => (
            <p key={item.id}>{item.name}</p>
          ))}

          <Link
            to="/cart"
            className="go-cart-btn"
            onClick={() => setShowDropdown(false)}
          >
            Go to Cart →
          </Link>
        </>
      )}
    </div>
  )}
</div>

</div>

  </div>
</header>
{/*router section*/ }
<Routes>
  <Route path="/" element={ 
    <>
    {/* FORM SECTION */}
      <section className="header">
        <h1>Car Dealership</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Car Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="model"
            placeholder="Model"
            value={formData.model}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />

          <button type="submit" className="card-button">
            {editId ? "Update Car": "Add Car"}
          </button>
        </form>
      </section>

      {/* CAR CARDS */}
     <GuardedCarList
  data={filteredCars}
  cart={cart}
  handleSelect={handleSelect}
  handleRemoveFromCart={handleRemoveFromCart}
  handleEdit={handleEdit}
  handleDelete={handleDelete}
/>
      </>
} />
 <Route path="/cart" element={<Cart cart={cart} onRemove={handleRemoveFromCart} />} />
</Routes>

  
    </div>
  );
}

// function App() {
//   return <Parent />
// }
export default App;

// import { useForm } from "react-hook-form";
// import { useState,useRef } from "react";

// function App() {
//   const { register, handleSubmit ,formState: {errors}} = useForm({
//     defaultValues:{
//       firstName:"Mike",
//       lastName:"jones"
//     }
//   });
//   const renderCount = useRef(0);

  
//   const [mytxt, setMytxt] = useState("");
// function handleChange(e) {
//     setMytxt(e.target.value);
    
//   }
// console.log("Errors:",errors);

//   return (
//     <div>
//       <h3>Render Count: {renderCount.current++}</h3>

//       <form onSubmit={handleSubmit(data => {
//         console.log("Form Date:",data);
//         alert(JSON.stringify(data, null, 2));
//       },
//       (errors)=>{
//         console.log("Form Errors:",errors);
//       }
//       )}>
//         <label>
//           First Name:
//           <input {...register("firstName",{required:'*this is required'})} 
//           placeholder="firstName" />
//           <p>{errors.firstName?.message}</p>
//         </label>

//         <br />

//         <label>
//           Last Name:
//           <input {...register("lastName",{required:'*this is required',minLength:{
//             value:3,
//             message:"min length is 3"
//           }})}  
//           placeholder="lastName"
//           />
//           <p>{errors.lastName?.message}</p>
//         </label>

//         <br />
//         {/*Radio button*/}
//         <p> Gender:</p>
//         <label>Male
//           <input type="radio"
//           value="male"
//           {...register("gender")}/>
          
//         </label>
//         <label>Female
//           <input type="radio"
//           value="female"
//           {...register("gender")}/>
//         </label>
//  <label>other
//           <input type="radio"
//           value="other"
//           {...register("gender")}/>
//         </label>
//         <br/>
// {/*Check Box*/}
// <p>Hobbies:</p>
// <label>Reading
//           <input type="checkbox"
//           value="Reading"
//           {...register("skills")}/>
//         </label>
//         <label>Travelling
//           <input type="checkbox"
//           value="Travelling"
//           {...register("skills")}/>
//         </label>
//         <label>Sketching
//           <input type="checkbox"
//           value="Sketching"
//           {...register("skills")}/>
//         </label>
//         <label>Sword Fighting
//           <input type="checkbox"
//           value="Sword Fighting"
//           {...register("skills")}/>
//         </label>
//         <label>Archery
//           <input type="checkbox"
//           value="Archery"
//           {...register("skills")}/>
//         </label>
//         <br/>
//         <label>
//           write somthing about yourself:
//           <textarea {...register("about")}/>
         
//         </label>

//          <br />
//         <input type="submit" value="Submit" />
//       </form>
//     </div>
//   );
// }

// export default App;