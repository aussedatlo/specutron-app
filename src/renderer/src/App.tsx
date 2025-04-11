import { HashRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/header'
import EmulatorView from './views/emulator'
import ApduView from './views/apdu'
import SettingsView from './views/settings'

function App(): JSX.Element {
  return (
    <div className="h-screen w-full flex flex-col p-2">
      <HashRouter>
        <Header />

        <Routes>
          <Route path="/" element={<EmulatorView />} />
          <Route path="/apdu" element={<ApduView />} />
          <Route path="/settings" element={<SettingsView />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
