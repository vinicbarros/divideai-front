import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.min.css";
import PrivateRoute from "./common/PrivateRoute";
import { UserContextProvider } from "./contexts/UserContext";
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/Sign-In";
import SignUp from "./pages/Sign-Up";
import { GlobalStyle } from "./style/GlobalStyle";
import Home from "./pages/Home";
import NewBill from "./pages/NewBill";
import BillPage from "./pages/BillPage";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <StyledToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/landing-page"
              element={<LandingPage />}
            />
            <Route
              path="/sign-in"
              element={<SignIn />}
            />
            <Route
              path="/sign-up"
              element={<SignUp />}
            />
            <Route element={<PrivateRoute redirectPath="/landing-page" />}>
              <Route
                path="/"
                element={<Home />}
              />
              <Route path="/payments" />
              <Route
                path="/new-bill"
                element={<NewBill />}
              />
              <Route
                path="/bill/:billId"
                element={<BillPage />}
              />
              <Route path="/social" />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

const StyledToastContainer = styled(ToastContainer)`
  display: flex;
  justify-content: flex-end;
  .Toastify__toast {
    width: 240px;
  }
  .Toastify__toast {
  }
  .Toastify__close-button {
    width: 20px;
  }
`;

export default App;
