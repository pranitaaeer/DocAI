export const loginUser = async (
  data: LoginData
) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw {
      response: {
        data: result,
      },
    };
  }

  return result;
};
