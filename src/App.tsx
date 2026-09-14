import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import { ThemeProvider } from '@/context/ThemeContext'
import Layout from '@/components/layout/Layout'
import LandingPage from '@/pages/LandingPage'
import ShopPage from '@/pages/ShopPage'
import ProductDetailPage from '@/pages/ProductDetailPage'
import CartPage from '@/pages/CartPage'
import CheckoutPage from '@/pages/CheckoutPage'
import OrderSuccessPage from '@/pages/OrderSuccessPage'
import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'
import DashboardPage from '@/pages/DashboardPage'
import TrackingPage from '@/pages/TrackingPage'
import BrandsPage from '@/pages/BrandsPage'
import PricingPage from '@/pages/PricingPage'
import SupportPage from '@/pages/SupportPage'
import ShippingPage from '@/pages/ShippingPage'
import ShippingCalculatorPage from '@/pages/ShippingCalculatorPage'
import CountriesPage from '@/pages/CountriesPage'
import InsurancePage from '@/pages/InsurancePage'
import NotFoundPage from '@/pages/NotFoundPage'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 5 * 60 * 1000 } },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <BrowserRouter>
              <Routes>
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route element={<Layout />}>
                  <Route index element={<LandingPage />} />
                  <Route path="shop" element={<ShopPage />} />
                  <Route path="product/:id" element={<ProductDetailPage />} />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="checkout" element={<CheckoutPage />} />
                  <Route path="order-success" element={<OrderSuccessPage />} />
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="track" element={<TrackingPage />} />
                  <Route path="brands" element={<BrandsPage />} />
                  <Route path="brands/:id" element={<BrandsPage />} />
                  <Route path="pricing" element={<PricingPage />} />
                  <Route path="support" element={<SupportPage />} />
                  <Route path="shipping" element={<ShippingPage />} />
                  <Route path="calculator" element={<ShippingCalculatorPage />} />
                  <Route path="countries" element={<CountriesPage />} />
                  <Route path="insurance" element={<InsurancePage />} />
                  <Route path="categories" element={<ShopPage />} />
                  <Route path="deals" element={<ShopPage />} />
                  <Route path="notifications" element={<DashboardPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
