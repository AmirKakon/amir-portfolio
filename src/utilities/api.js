const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const getProjectCards = async () => {
  const response = await fetch(`${apiBaseUrl}/api/projects/card/getAll`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const res = await response.json();
  return res.data;
};
