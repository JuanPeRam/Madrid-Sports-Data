import './App.css'
import { ThemeProvider } from './components/theme-provider'
import { Home } from './pages/Home'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='flex flex-col items-center justify-center font-rubik'>
        <Home/>
      </div>
    </ThemeProvider>
  )
}

export default App
