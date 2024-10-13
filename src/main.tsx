import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BoardProvider } from './context/board.tsx'
import { GlobalStyle } from './assets/styles/GlobalStyles'

createRoot(document.getElementById('root')!).render(
    <BoardProvider>
        <GlobalStyle />
        <App />
    </BoardProvider>
)
