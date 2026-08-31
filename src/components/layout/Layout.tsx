import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const NO_FOOTER = ['/login', '/signup', '/dashboard', '/checkout']
const NO_NAVBAR_ROUTES = ['/login', '/signup', '/dashboard', '/notifications']
export default function Layout() {
  const { pathname } = useLocation()
  const hideNav = NO_NAVBAR_ROUTES.some((r) => pathname.startsWith(r))
  const hideFooter = NO_FOOTER.some((r) => pathname.startsWith(r))

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNav && <Navbar />}
      <div className="flex-1">
        <Outlet />
      </div>
      {!hideFooter && <Footer />}
    </div>
  )
}
