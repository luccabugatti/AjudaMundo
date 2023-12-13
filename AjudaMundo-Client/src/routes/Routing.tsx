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
  AccountOng,
  AllActivities,
  ActivityDetails
} from '../pages'
import { HeaderOng, Footer, HeaderUser, Header } from '../components'
import { AuthContext, RequireAuth } from '../contexts'

import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from 'react-router-dom'

const Routing = () => {
  const { ong, user } = useContext(AuthContext)


  const tabsOng = ['home-ong', 'conta-ong']
  const tabsUser = ['home-user', 'todas-atividades', 'conta-user']

  return (
    <Router>
      {ong && <HeaderOng loggedIn={true} tabs={tabsOng} />}
      {user && <HeaderUser loggedIn={true} tabs={tabsUser} />}
      {(!ong && !user) && <Header loggedIn={false} tabs={[]}/>}
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
        <Route
          path="/detalhes-atividade/:id"
          element={
            <RequireAuth>
              <ActivityDetails />
            </RequireAuth>
          }
        />
        <Route
          path="/todas-atividades"
          element={
            <RequireAuth>
              <AllActivities />
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
