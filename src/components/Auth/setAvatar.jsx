import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Buffer } from 'buffer';
import './avatar.css'
import { setAvatarRoute } from '../../utils/APIRoutes';

const SetAvatar = () => {
    const navigate = useNavigate();
    const url = "https://api.multiavatar.com/";
    const [avatars,setAvatars] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [selectedAvatar,setSelectedAvatar] = useState(undefined);

    const toastParams = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: false,
        draggable: false,
        theme: "dark"
    };

    useEffect(() => {
        if (!localStorage.getItem("chatApp-user")) {
            navigate("/login");
        }
    },[])

    const handleSubmit = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastParams)
        } else {
            const user = await JSON.parse(localStorage.getItem("chatApp-user"));
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar],
            });
            console.log(data)
            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chatApp-user", JSON.stringify(user));
                navigate('/');
            } else {
                toast.error("Error setting avatar", toastParams);
            }
        }


    };
    
    async function fetchAvatars() {
        const data = [];
        const image1 = await axios.get(
            `${url}/${Math.round(Math.random()*100000000)}/${Math.round(Math.random()*1000)}`
            );
        const image2 = await axios.get(
            `${url}/${Math.round(Math.random()*100000000)}/${Math.round(Math.random()*1000)}`
            );
        const buffer1 = new Buffer(image1.data);
        const buffer2 = new Buffer(image2.data);
        data.push(buffer1.toString("base64"));
        data.push(buffer2.toString("base64"));
 
        setAvatars(data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchAvatars();
    },[])

  return (
    <>
    {isLoading ? (
        <div className="wrapper">
            <span className='loader'>Loading...</span>
        </div>
    ) : (
        <div className='wrapper'>
            <h1 className='title-text'>Pick your avatar</h1>
            <div className='avatar-container'>
                {
                    avatars.map((avatar,index) => {
                        return (
                            <div
                                key={index}
                                className={`avatar ${selectedAvatar === index ? "selected" : "" }`}>
                                    <img 
                                        className='avatar-image'
                                        src = {`data:image/svg+xml;base64,${avatar}`} 
                                        alt="avatar"
                                        key={avatar}
                                        onClick={() => setSelectedAvatar(index)}
                                    />
                            </div>
                        )
                    })}
            </div>
            <button onClick={handleSubmit} className="sbmt_btn">
                Submit
            </button>
            <ToastContainer />
        </div>
        )}
    </>      
  )
}

export default SetAvatar
