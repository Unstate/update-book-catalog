import './index.css'
import { createRoot } from 'react-dom/client'

import App from './components/App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
