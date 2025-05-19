// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <AuthProvider>
//       <App />
//     </AuthProvider>
//   </React.StrictMode>
// );


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ExpenseProvider } from './context/ExpenseContext'; // Import ExpenseProvider


// main.jsx or index.js
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ExpenseProvider>
        <App />
      </ExpenseProvider>
    </AuthProvider>
  </React.StrictMode>
);
