
import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase'; // adjust path if needed
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Auth = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (mode === 'signin') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f2c] text-white px-4">
      <Link
        to="/"
        className="absolute top-4 left-4 bg-white/20 text-white px-4 py-1 rounded hover:bg-white/30" >
        ← Home
      </Link>

      <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {mode === 'signin' ? 'Sign In to FilmAF' : 'Create an Account'}
        </h2>

        {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full mb-4 bg-white text-black font-medium py-2 rounded hover:bg-gray-100 transition"
        >
          Sign in with Google
        </button>

        <div className="text-center mb-4 text-sm text-white/70">or</div>

        {/* Email Auth Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded bg-white/20 text-white placeholder-white/60"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-white/20 text-white placeholder-white/60"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>

          <button type="submit" className="w-full bg-[#5c3ee8] hover:bg-[#472bcf] text-white py-2 rounded font-medium">
            {mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="text-sm mt-4 text-center">
          {mode === 'signin' ? (
            <>
              Don't have an account?{' '}
              <Link to="/signup-a" className="text-purple-300 hover:underline">
                Sign Up
              </Link>

            </>
          ) : (
            <>
              Already have an account?{' '}
              <button onClick={() => setMode('signin')} className="text-purple-300 hover:underline">
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
