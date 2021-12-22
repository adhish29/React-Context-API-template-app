import React from 'react';
import { useState, createContext, useContext } from 'react';
import './style.css';

const MyContext = createContext();

function Car({ id, name, price, incrementPrice, decrementPrice }) {
  return (
    <>
      <p>Name: {name}</p>
      <p>price: {price}</p>
      <button style={{ marginRight: '5px' }} onClick={incrementPrice}>
        &uarr;
      </button>
      <button onClick={decrementPrice}>&darr;</button>
    </>
  );
}

//CONSUMING OPTION 1 --- through contextname.Consumer component

// function Cars() {
//   return (
//     <MyContext.Consumer>
//       {
//         (context) => (
//           <>
//             <h4>Cars</h4>
//             {context.cars.map((car) => (
//               <Car
//                 key={car.id}
//                 id={car.id}
//                 name={car.name}
//                 price={car.price}
//                 incrementPrice={() => context.incrementPrice(car.id)}
//                 decrementPrice={() => context.decrementPrice(car.id)}
//               />
//             ))}
//           </>
//         )
//         // console.log(context);
//       }
//     </MyContext.Consumer>
//   );
// }

//CONSUMING OPTION 2 --- through useContext hook

function Cars() {
  const context = useContext(MyContext);
  console.log(context);
  return (
    <>
      <h4>Cars</h4>
      {context.cars.map((car) => (
        <Car
          key={car.id}
          id={car.id}
          name={car.name}
          price={car.price}
          incrementPrice={() => context.incrementPrice(car.id)}
          decrementPrice={() => context.decrementPrice(car.id)}
        />
      ))}
    </>
  );
}

function ProductList() {
  return (
    <div>
      <h2>Product list:</h2>
      <Cars />
    </div>
  );
}

export default function App() {
  return (
    <MyProvider>
      <h1>Welcome to my car store</h1>
      <ProductList />
    </MyProvider>
  );
}

function MyProvider(props) {
  const carsObj = [
    { id: 'car001', name: 'Honda', price: 100 },
    { id: 'car002', name: 'BMW', price: 150 },
    { id: 'car003', name: 'Mercedes', price: 200 },
  ];

  const [cars, setCars] = useState(carsObj);

  function incrementPrice(id) {
    const newcarsObj = cars.map((car) =>
      car.id === id ? { ...car, price: car.price + 1 } : car
    );
    console.log(newcarsObj);
    setCars(newcarsObj);
  }

  function decrementPrice(id) {
    const newcarsObj = cars.map((car) =>
      car.id === id ? { ...car, price: car.price - 1 } : car
    );
    console.log(newcarsObj);
    setCars(newcarsObj);
  }

  return (
    <MyContext.Provider
      value={{
        cars,
        incrementPrice,
        decrementPrice,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}
