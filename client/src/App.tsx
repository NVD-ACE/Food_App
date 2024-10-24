// import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ForgotPassword,
  Login,
  ResetPassword,
  Signup,
  VerifyEmail,
} from "./auth";
import {
  Cart,
  HereSection,
  Loading,
  NotFoundComponent,
  Profile,
  RestaurantDetail,
  SearchPage,
  Success,
} from "./components";
import MainLayout from "./layout/MainLayout";
import { AddMenu, Order, Restaurant } from "./admin";
import { useUserStore } from "./store/useUserStore";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import ErrorComponent from "./components/ErrorComponent";
import { useThemeStore } from "./store/useThemeStore";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

const AuthenciatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const AdminRouter = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user?.admin) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/",
        element: <HereSection />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/search/:text",
        element: <SearchPage />,
        errorElement: <ErrorComponent />,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/status",
        element: <Success />,
      },
      // admin routes start here
      {
        path: "/admin/restaurant",
        element: (
          <AdminRouter>
            <Restaurant />
          </AdminRouter>
        ),
      },
      {
        path: "/admin/menu",
        element: (
          <AdminRouter>
            <AddMenu />
          </AdminRouter>
        ),
      },
      {
        path: "/admin/orders",
        element: (
          <AdminRouter>
            <Order />
          </AdminRouter>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthenciatedUser>
        <Login />
      </AuthenciatedUser>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthenciatedUser>
        <Signup />
      </AuthenciatedUser>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <AuthenciatedUser>
        <ForgotPassword />
      </AuthenciatedUser>
    ),
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "*", // Bất kỳ đường dẫn nào không khớp sẽ sử dụng component này
    element: <NotFoundComponent />,
  },
]);
function App() {
  // const [count, setCount] = useState(0)
   const initializeTheme = useThemeStore((state: any) => state.initializeTheme);
   const {checkAuthentication, isCheckingAuth} = useUserStore();
   // check auth every time when page is loaded
    useEffect(()=>{
      checkAuthentication()
      initializeTheme() // initialize theme when app starts up (only once)
    },[checkAuthentication])
    if(isCheckingAuth){
      return <Loading/>
    }
  return (
    <main>
      <RouterProvider router={appRouter}></RouterProvider>
    </main>
  );
}

export default App;
// {
//   path: "*",
//   element: <h1>404 Not Found</h1>,
//   // children: [
//   //   { path: "*", element: <h1>404 Not Found</h1> }
//   // ]
// }
