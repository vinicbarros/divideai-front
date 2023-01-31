export default function useToken() {
  const tokenData = JSON.parse(
    localStorage.getItem("userData") as string
  )?.token;

  return tokenData as string;
}
