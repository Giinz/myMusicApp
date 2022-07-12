import VideosBackground from '../../Components/VideoBackground/VideoBackground';
import videoBg from '../../Assets/videoBg.mp4'
import './Homepage.scss';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import {Link} from 'react-router-dom';
import { useState } from 'react';

const Homepage = () => {
    const [userForm, setUserForm] = useState({username:'',password:''})

    const handleChange = (e) => {
        const {value, name} = e.target;
        setUserForm({...userForm, [name]:value}) 
    }
    return (
        <div className="Homepage">
            <div className="Homepage__background">
                <VideosBackground videoBg={videoBg}/>
            </div>
            <div className="Homepage__title">
                <h1>MUSIC BANK</h1>
                <h2>AN ONLINE MUSIC PLAYER</h2>
            </div>
            <div className="Homepage__login">
                <Input type='text' name='username' hasVal={!!userForm.username} placeHolder='username' value={userForm.username} handleChange={handleChange} />
                <Input type='password' name='password' hasVal={!!userForm.password} placeHolder='password' value={userForm.password} handleChange={handleChange} />
                <Link to='music'><Button value='Login' /></Link>

            </div>
        </div>
    )
}

export default Homepage