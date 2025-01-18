import { useState } from 'react'
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'


import MainLayout from './layouts/MainLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import UserProfile from './pages/UserProfilePage.jsx';
import ListNFTPage from './pages/ListNFTPage.jsx'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/userprofile' element={<UserProfile />} />
        <Route path='/listYourNft' element={<ListNFTPage />} />
      </Route>,
      
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App
