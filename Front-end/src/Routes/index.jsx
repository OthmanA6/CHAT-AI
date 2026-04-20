import { BrowserRouter, Route, Routes } from "react-router-dom"
import { nonAuthRoutes, routes } from "./routes";
import ThemeLayout from "../ThemeLayout";
import NonLayout from "../ThemeLayout/NonLayout";

const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {(nonAuthRoutes || []).map((item, key) => (
            <Route key={key} path={item.path} element={
              <NonLayout>
                {item.component}
              </NonLayout>
            } />
          ))}

          {(routes || []).map((item, key) => (
            <Route key={key} path={item.path} element={
              <ThemeLayout>
                {item.component}
              </ThemeLayout>
            } />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Routing;
