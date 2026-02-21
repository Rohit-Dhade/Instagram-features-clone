import {BrowserRouter , Routes , Route} from 'react-router';
import LoginForm from './features/auth/pages/LoginForm';
import RegistrationForm from './features/auth/pages/RegistrationForm';

const Approutes = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<h1>Welcome to the App!</h1>}/>
                <Route path='/login' element={<LoginForm/>} />
                <Route path='/register' element={<RegistrationForm/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Approutes;