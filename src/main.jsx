import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import { Provider } from "react-redux";
import store from "./store";
import "@babel/polyfill";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.Fragment>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.Fragment>
);

serviceWorker.unregister();


// db.createCollection("withschema",{
//   validator:{
//     $jsonSchema:{
//       required:["first_name","last_name","email","gender","Job"],
//       properties:{
//         first_name:{
//           bsonType:"string",
//           description:"First Name is Mandatory"
//         },
//         last_name:{
//           bsonType:"string",
//           description:"Last Name is Mandatory"
//         },
//         email:{
//           bsonType:"string",
//           description:"Email is Mandatory"
//         },
//         gender:{
//           bsonType:"string",
//           description:"Gender is Mandatory"
//         },
//         Job:{
//           bsonType:"string",
//           description:"Job is Mandatory"
//         },
//       }
//     }
//   },
//   validationAction:"error"
// })
