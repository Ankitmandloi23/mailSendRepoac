

// Login API call
export const loginAPIcall = async ({ email, password }) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }
    return data;  // Returning the response data (which should include the token)
  } catch (error) {
    throw error;  // Handle errors
  }
};
