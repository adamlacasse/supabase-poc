import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Avatar from './Avatar';

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const { data, error } = await supabase
        .from('profiles')
        .select('username, website, avatar_url')
        .eq('id', user.id)
        .single();

      if (error) {
        throw error;
      }

      setUsername(data.username);
      setWebsite(data.website);
      setAvatarUrl(data.avatar_url);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  // eslint-disable-next-line no-shadow
  async function updateProfile({ username, website, avatarUrl }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url: avatarUrl,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProfile();
  }, [session]);

  return (
    <div className="form-widget">
      <Avatar
        url={avatarUrl}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ username, website, avatarUrl: url });
        }}
      />
      <div>
        <label htmlFor="email">
          Email
          <input id="email" type="text" value={session.user.email} disabled />
        </label>
      </div>
      <div>
        <label htmlFor="username">
          Name
          <input
            id="username"
            type="text"
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="website">
          Website
          <input
            id="website"
            type="website"
            value={website || ''}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>

      <div>
        <button
          type="button"
          className="button block primary"
          onClick={() => updateProfile({ username, website, avatarUrl })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button type="button" className="button block" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
