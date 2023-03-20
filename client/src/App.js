import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Error, Landing, Register } from './_pages'
import { AddJob, AllJobs, SharedLayout, Stats, Profile } from './_pages/dashboard'
import ProtectedRoute from './_pages/ProtectedRoute'

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }>
            <Route index element={ <Stats />} />
            <Route path='jobs' element={ <AllJobs />} />
            <Route path='addJob' element={ <AddJob />} />
            <Route path='profile' element={ <Profile />} />
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/landing' element={< Landing />}/>
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
