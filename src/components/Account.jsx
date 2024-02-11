import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import Error from './Error';
// import Avatar from './Avatar';

export default function Account({ user }) {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  async function getProfile() {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('first_name, last_name, avatar_url')
        .eq('id', user.id)
        .single();

      if (error) {
        throw error;
      }

      setFirstName(data.first_name);
      setLastName(data.last_name);
      setAvatarUrl(data.avatar_url);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  // eslint-disable-next-line no-shadow
  async function updateProfile({ firstName, lastName, avatarUrl }) {
    try {
      const updates = {
        id: user.id,
        first_name: firstName,
        last_name: lastName,
        avatar_url: avatarUrl,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('users').upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  if (errorMessage) {
    return <Error message={errorMessage} />;
  }

  return (
    <div>
      <h2>This your account info</h2>
      {/* <Avatar
        url={avatarUrl}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ firstName, lastName, avatarUrl: url });
        }}
      /> */}
      <div>
        <label htmlFor="email">
          Email
          <input id="email" type="text" value={user.email} disabled />
        </label>
      </div>
      <div>
        <label htmlFor="first-name">
          First name
          <input
            id="first-name"
            type="text"
            value={firstName || ''}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="last-name">
          Last name
          <input
            id="last-name"
            type="text"
            value={lastName || ''}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
      </div>

      <div>
        <button
          type="button"
          onClick={() => updateProfile({ firstName, lastName, avatarUrl })}
        >
          Update
        </button>
      </div>

      <div>
        <button
          type="button"
          onClick={() => {
            supabase.auth.signOut();
            navigate('/auth');
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
