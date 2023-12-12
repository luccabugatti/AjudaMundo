import React, { useContext } from 'react'

import {
  Login,
  Home,
  HomeUser,
  NotFound,
  Register,
  Account,
  CreateActivity,
  EditActivity,
} from '../pages'
import { Header, Footer } from '../components'
import { AuthContext, RequireAuth } from '../contexts'

import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from 'react-router-dom'

const Routing = () => {
  const { ong } = useContext(AuthContext)

  const tabs = ['home', 'conta']

  return (
    <Router>
      <Header loggedIn={ong ? true : false} tabs={tabs} />
      <Routes>
        <Route path="/" element={ong ? <Navigate to={'/home'} /> : <Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/home-user"
          element={
            <RequireAuth>
              <HomeUser />
            </RequireAuth>
          }
        />
        <Route
          path="/conta"
          element={
            <RequireAuth>
              <Account />
            </RequireAuth>
          }
        />
        <Route
          path="/criar-atividade"
          element={
            <RequireAuth>
              <CreateActivity />
            </RequireAuth>
          }
        />
        <Route
          path="/editar-atividade/:id"
          element={
            <RequireAuth>
              <EditActivity />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export { Routing }
