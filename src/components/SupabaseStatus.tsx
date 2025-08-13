import React from 'react';

interface SupabaseStatusProps {
  isConfigured: boolean;
}

export const SupabaseStatus: React.FC<SupabaseStatusProps> = ({ isConfigured }) => {
  if (isConfigured) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 w-full">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800 font-nyt">
              Supabase Connected
            </h3>
            <div className="mt-2 text-sm text-green-700 font-nyt">
              <p>Your posts are being saved to the database and will persist permanently.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 w-full">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800 font-nyt">
            Supabase Not Configured
          </h3>
          <div className="mt-2 text-sm text-yellow-700 font-nyt">
            <p>Posts are currently only saved locally. To ensure permanent storage:</p>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Create a Supabase project at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline">supabase.com</a></li>
              <li>Copy your project URL and anon key</li>
              <li>Create a <code className="bg-yellow-100 px-1 rounded">.env</code> file with your credentials</li>
              <li>Run the database setup script</li>
            </ol>
            <p className="mt-2 text-xs">
              See <code className="bg-yellow-100 px-1 rounded">SETUP_SUPABASE.md</code> for detailed instructions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
