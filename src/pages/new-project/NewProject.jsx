import { useFetchPatentFromUSPTOMutation } from '@/redux/services/patent-api';

const NewProject = () => {
  const [fetchPatent, { isLoading, error }] = useFetchPatentFromUSPTOMutation();

  const handleFetch = async (patentId) => {
    try {
      const result = await fetchPatent(patentId).unwrap();
      console.log('Success:', result);
    } catch (err) {
      if (err?.status === 401) {
        console.error('Not authenticated. Please log in.');
        // Redirect to login or show auth modal
      } else {
        console.error('Error:', err.data?.message);
      }
    }
  };

  return (
    <div>
      NewProject{' '}
      <button onClick={() => handleFetch('US-20210123456-A1')} disabled={isLoading}>
        {isLoading ? 'Fetching...' : 'Fetch Patent'}
      </button>
      {error && <p className="text-red-500">{error.data?.message}</p>}
    </div>
  );
};
export default NewProject;
