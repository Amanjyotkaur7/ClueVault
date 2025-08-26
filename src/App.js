// // import { BrowserRouter, Routes, Route } from 'react-router-dom';
// // import Login from './pages/Login';
// // import Home from './pages/Home';
// // import MessageViewer from './pages/MessageViewer';
// // import Dashboard from './pages/Dashboard';

// // function App() {
// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/" element={<Home />} />
// //         <Route path="/dashboard" element={<Dashboard />} />
// //         <Route path="/message/:id" element={<MessageViewer />} />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;

// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Home from './pages/Home';
// import MessageViewer from './pages/MessageViewer';
// import Dashboard from './pages/Dashboard';
// import { useEffect } from 'react';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import ZoneConfession from './components/ZoneConfession';

// function App() {
//    useEffect(() => {
//     AOS.init({ duration: 1200, once: true });
//   }, []);
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/" element={<Home />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/message/:id" element={<MessageViewer />} />
//         <Route path="/zone-confession" element={<ZoneConfession />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';       // 💬 Secret message vault
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import MessageViewer from './pages/MessageViewer';
import ZoneConfession from './components/ZoneConfession';
import VaultCard from './components/VaultCard';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/VaultCard" element={<VaultCard />} />
         <Route path="/zone" element={<ZoneConfession />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/message/:id" element={<MessageViewer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
