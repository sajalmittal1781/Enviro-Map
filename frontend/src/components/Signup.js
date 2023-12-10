// import React, { useState, useContext } from 'react';
// import { signUpWithEmailAndPassword } from './firebase/firebase';
// import { AuthContext } from './context/AuthContext';
// import { Link } from 'react-router-dom';

// import logoImage from './images/enviromap_logo.png';

// const Signup = () => {
//   const auth = useContext(AuthContext);

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSignup = async () => {
//     try {
//       // Check email validity
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(email)) {
//         setError('Invalid email address');
//         return;
//       }

//       // Check password length
//       if (password.length < 6) {
//         setError('Password must be at least 6 characters long');
//         return;
//       }

//       await signUpWithEmailAndPassword(email, password);
//       auth.login();
//     } catch (error) {
//       setError("Already Registered. Login Instead.");
//       console.error('Error signing up:', error.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
//         <img
//           src={logoImage}
//           alt="EnviroMap Logo"
//           className="mx-auto mb-6 max-w-full h-auto"
//           style={{ maxHeight: '100px' }} // Adjust the max height as needed
//         />

//         <h1 className="text-4xl font-extrabold mb-6 text-blue-500">EnviroMap Sign Up</h1>
//         <h2 className="text-lg text-gray-600 mb-4">Join us and explore the world's weather data</h2>

//         {error && <p className="text-red-500 mb-4">{error}</p>}

//         <form className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:border-blue-500"
//             />
//           </div>
//           <button
//             type="button"
//             onClick={handleSignup}
//             className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
//           >
//             Sign Up
//           </button>
//         </form>

//         <p className="mt-4 text-gray-600">
//           Already have an account?{' '}
//           <Link to="/login" className="text-blue-500 hover:underline">
//             Log in here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;



import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { signUpWithEmailAndPassword } from './firebase/firebase';
import { AuthContext } from './context/AuthContext';
import { Link } from 'react-router-dom';

import logoImage from './images/enviromap_logo.png';

const Signup = () => {
  const auth = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      // Check email validity
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Invalid email address');
        return;
      }

      // Check password length
      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }

      await signUpWithEmailAndPassword(email, password);
      auth.login();
    } catch (error) {
      setError("Already Registered. Login Instead.");
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded shadow-md w-full max-w-md text-center"
      >
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          src={logoImage}
          alt="EnviroMap Logo"
          className="mx-auto mb-6 max-w-full h-auto"
          style={{ maxHeight: '100px' }}
        />

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-4xl font-extrabold mb-6 text-blue-500"
        >
          EnviroMap Sign Up
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-lg text-gray-600 mb-4"
        >
          Join us and explore the world's weather data
        </motion.h2>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-red-500 mb-4"
          >
            {error}
          </motion.p>
        )}

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            type="button"
            onClick={handleSignup}
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
          >
            Sign Up
          </motion.button>
        </form>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-4 text-gray-600"
        >
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in here
          </Link>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Signup;
