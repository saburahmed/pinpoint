import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./screens/Home";
import "./App.scss";

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            {/* <Route path="/get-started" element={<GetStarted />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="deals" element={<Deals />} />
            <Route path="purchases" element={<Purchases />} />
            <Route path="quickshops" element={<Quickshops />} />
            <Route path="repayments" element={<Repayments />}>
              <Route index element={<UpcomingRepayments />} />
              <Route path="history" element={<RepaymentHistory />} />
            </Route>
            <Route path="settings" element={<Settings />} />
            <Route path="stores" element={<Stores />} />
          </Route> */}
          </Routes>
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  );
}

export default App;
