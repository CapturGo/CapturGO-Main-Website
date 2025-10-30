import { useEffect, useState } from 'react';
import { fetchLeaderboard, calculateReward } from '../lib/externalSupabase';

export default function Leaderboard() {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadLeaderboard = async () => {
    try {
      const data = await fetchLeaderboard();
      setProfiles(data);
      setError(null);
    } catch (err) {
      setError('Failed to load leaderboard');
      console.error('Error loading leaderboard:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLeaderboard();

    // Refresh every 10 minutes
    const interval = setInterval(loadLeaderboard, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-lg">
        <div className="animate-pulse flex flex-col gap-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-800/50 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-lg">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-lg">
      <div className="px-6 py-4 border-b border-gray-800">
        <h2 className="text-xl font-semibold text-white">Top 50 Token Holders</h2>
      </div>
      
      {/* Header Row */}
      <div className="px-6 py-3 bg-gray-800/50 border-b border-gray-700 grid grid-cols-4 gap-0 text-sm font-medium text-gray-300">
        <div className="w-8">Rank</div>
        <div className="pl-2">Username</div>
        <div className="text-right">Token Balance</div>
        <div className="text-right">Rewards to Earn</div>
      </div>
      
      <div className="divide-y divide-gray-800 max-h-[600px] overflow-y-auto">
        {profiles.map((profile, index) => {
          const position = index + 1;
          const reward = calculateReward(position);
          
          return (
            <div
              key={profile.username}
              className="px-6 py-4 grid grid-cols-4 gap-0 items-center hover:bg-gray-800/30 transition-colors duration-200"
            >
              <div className="w-8">
                <span className={`
                  text-sm font-medium
                  ${index === 0 ? 'text-yellow-500' : ''}
                  ${index === 1 ? 'text-gray-300' : ''}
                  ${index === 2 ? 'text-amber-600' : ''}
                  ${index > 2 ? 'text-gray-500' : ''}
                `}>
                  #{position}
                </span>
              </div>
              
              <div className="pl-2">
                <p className="font-medium text-white truncate">{profile.username}</p>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-medium text-indigo-400">
                  {profile.token_balance.toLocaleString()}
                </p>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-medium text-gray-400">
                  To be announced
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
