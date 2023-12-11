import { BrowserRouter, Route, Routes } from "react-router-dom";

import { PrivateRoute } from "./utils";
import {
  Page403,
  Page500,
  RouteAdmin,
  RouteAuth,
  RouteClient,
  Success,
} from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<RouteClient />} />
          <Route element={<PrivateRoute allowedRoles={["User", "Admin"]} />}>
            <Route path="/auth/*" element={<RouteAuth />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
            <Route path="/admin/*" element={<RouteAdmin />} />
          </Route>
          <Route path="/unauthorized" element={<Page403 />} />
          <Route path="/oauth-error" element={<Page500 />} />
          <Route path="/success-payment" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
