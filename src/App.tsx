import { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY; // Replace with your real API key
const CHANNEL_ID = 'UCjmRBISh_RbUnJeNxidjgKQ'; // Replace with the actual channel ID

type ChannelStats = {
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
};

function App() {
  const [stats, setStats] = useState<ChannelStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`
        );
        const data = await res.json();
        console.log(data); // Add this line for debugging
        if (data.error) {
          setError(data.error.message);
        } else if (data.items && data.items.length > 0) {
          setStats(data.items[0].statistics);
        } else {
          setError('Channel not found or no statistics available.');
        }
      } catch (err) {
        setError('Failed to fetch data.');
      }
    };

    fetchStats();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>YouTube Channel Stats</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {stats ? (
        <div>
          <p>👥 Subscribers: {stats.subscriberCount}</p>
          <p>📹 Videos: {stats.videoCount}</p>
          <p>👁️ Views: {stats.viewCount}</p>
        </div>
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
