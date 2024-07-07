import "@/styles/globals.scss";
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import axiosHelper from '@/lib/axiosHelper'
import { useRouter } from 'next/navigation';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const onUnauthorised = () => router.push('/login')

  axiosHelper.setUpAuthorizationInterceptors(onUnauthorised)

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
