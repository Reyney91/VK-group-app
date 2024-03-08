import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AppRoot, ConfigProvider } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ConfigProvider>
		<AppRoot mode='full'>
			<App />
		</AppRoot>
	</ConfigProvider>
);

