import React, { useContext } from 'react'

import {
  LoginOng,
  HomeUser,
  NotFound,
  RegisterOng,
  CreateActivity,
  EditActivity,
  HomeOng,
  LoginUser,
  AcessType,
  RegisterUser,
  AccountUser,
  AccountOng
} from '../pages'
import { HeaderOng, Footer, HeaderUser } from '../components'
import { AuthContext, RequireAuth } from '../contexts'

import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from 'react-router-dom'

const Routing = () => {
  const { ong, user } = useContext(AuthContext)


  const tabsOng = ['home', 'conta']
  const tabsUser = ['home', 'atividades', 'conta']

  return (
    <Router>
      {ong && <HeaderOng loggedIn={true} tabs={tabsOng} />}
      {user && <HeaderUser loggedIn={true} tabs={tabsUser} />}
      {!ong && !user && <HeaderOng loggedIn={false} tabs={tabsOng}/>}
      <Routes>
        <Route 
          path="/" 
          element={
            <AcessType />
          } 
        />
        <Route
          path="/login-ong"
          element={
              <LoginOng />
          }
        />
        <Route
          path="/login-user"
          element={
              <LoginUser />
          }
        />
        <Route
          path="/cadastro-ong"
          element={
              <RegisterOng />
          }
        />
        <Route
          path="/cadastro-user"
          element={
              <RegisterUser />
          }
        />
        <Route
          path="/home-ong"
          element={
            <RequireAuth>
              <HomeOng />
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
          path="/conta-user"
          element={
            <RequireAuth>
              <AccountUser />
            </RequireAuth>
          }
        />
         <Route
          path="/conta-ong"
          element={
            <RequireAuth>
              <AccountOng />
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
