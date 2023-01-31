import useToken from "../hooks/useToken";

export function createAuthHeader() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const token = useToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}
