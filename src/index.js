import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import reportWebVitals from "./reportWebVitals"
import "./sass/main.scss"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import LoginForm from "./pages/LoginForm"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Dashboard from "./pages/Dashboard"
import ProtectRoute from "./components/ProtectRoute"

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route path='/sign-in/' element={<LoginForm />}></Route>
          <Route
            path='/dashboard'
            element={
              <ProtectRoute>
                <Dashboard />
              </ProtectRoute>
            }></Route>
        </Routes>
      </Router>
    </Provider>
    <Footer />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
