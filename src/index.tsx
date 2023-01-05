import ReactDOM from 'react-dom/client'
import App from './container/App/App'
import * as firebase from 'firebase/app'
import { Provider } from 'react-redux'
import { store } from 'redux/store'

const firebaseConfig = {
    apiKey: 'AIzaSyC-vIsDGiJlEFKOIyPpUt2SG6HqfoPNW-8',
    authDomain: 'test-server-f1713.firebaseapp.com',
    databaseURL:
        'https://test-server-f1713-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'test-server-f1713',
    storageBucket: 'test-server-f1713.appspot.com',
    messagingSenderId: '380347029454',
    appId: '1:380347029454:web:6d08fd0318a57431563d9f',
}

firebase.initializeApp(firebaseConfig)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <Provider store={store}>
        <App />
    </Provider>
)
