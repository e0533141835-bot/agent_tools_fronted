// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/LoginPage';
// import Dashboard from './components/Dashboard';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* נתיב ברירת המחדל - מסך ההתחברות */}
//         <Route path="/" element={<Login />} />
        
//         {/* הנתיב של המסך הראשי */}
//         <Route path="/dashboard" element={<Dashboard />} />
        
//         {/* אם מישהו מקיש כתובת לא נכונה, נזרוק אותו להתחברות */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;



// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;