import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Bookings from './pages/Bookings'
import Account from './pages/Account'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import Settings from './pages/Settings'
import Users from './pages/Users'
import AppLayout from './ui/AppLayout'
import Cabins from './pages/Cabins'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import Booking from './pages/Booking'
import Checkin from './pages/Checkin'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000
    },
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to='dashboard' />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='bookings' element={<Bookings />} />
            <Route path='bookings/:bookingId' element={<Booking />} />
            <Route path='checkin/:bookingId' element={<Checkin />} />
            <Route path='cabins' element={<Cabins />} />
            <Route path='account' element={<Account />} />
            <Route path='settings' element={<Settings />} />
            <Route path='users' element={<Users />} />
          </Route>
          <Route path='login' element={<Login />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <div className='backdrop-blur-sm brightness-75'></div>
      <Toaster 
        position='top-center'
        gutter={12}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          className: 'm-0 shadow-none border-2 -border--color-grey-200 text-lg w-fit max-w-[500px] py-4 px-6 -bg--color-grey-0 -text--color-grey-700 rounded-full px-4 py-1'
        }}
      />
    </QueryClientProvider>
  )
}

export default App
