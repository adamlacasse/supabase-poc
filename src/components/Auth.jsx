import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import Spinner from './Spinner';

export default function Auth({ setUser }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      throw error;
    }

    const { data: { user } } = await supabase.auth.getUser();
    setIsLoading(false);
    setUser(user);
    navigate('/account');
  };

  const handleSignUp = async ({ email, password }) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      throw error;
    }

    const { data: { user } } = await supabase.auth.getUser();
    setIsLoading(false);
    setUser(user);
    navigate('/account');
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div>
        <h2>Sign in or up, bro</h2>
        <div>
          <input
            type="email"
            placeholder="Your email"
            value={formEmail}
            onChange={(e) => setFormEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Your password"
            value={formPassword}
            onChange={(e) => setFormPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleLogin({ email: formEmail, password: formPassword });
            }}
          >
            Log in
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleSignUp({ email: formEmail, password: formPassword });
            }}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
