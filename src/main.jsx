import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppRouter } from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import {Provider} from 'react-redux';
import { store } from './redux_store/app.store.js'
import {Toaster} from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster />
      <RouterProvider router={AppRouter} />
    </Provider>
  </StrictMode>
)
