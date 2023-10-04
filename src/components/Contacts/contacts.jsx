import React, { useEffect, useState } from 'react'
import './contacts.css'

const Contact = ({ contacts, currentUser, changeChat }) => {
    const [currentUserName, setCurrentUserName] = useState(null);
    const [currentUserImage, setCurrentUserImage] = useState(null);
    const [currentSelected, setCurrentSelected] = useState(null);

    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage)
            setCurrentUserName(currentUser.username)
        }
    }, [currentUser]);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };
    
    return (
        <>
            {currentUserImage && currentUserName && (
                <div className="contact_container">
                    <div className='brand'>
                        <h3 className='brand-title'>echoexchange</h3>
                    </div>
                    <div className="contacts">
                        {
                            contacts.map((contact, index) => {
                                return (
                                    <div
                                        className={`contact ${index === currentSelected ? "selected" : ""}`}
                                        key={index}
                                        onClick={() => changeCurrentChat(index, contact)}
                                    >
                                        <div className="avatar">
                                            <img
                                                className="users_avatar_image"
                                                src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                                alt="avatar"
                                            />
                                        </div>
                                        <div className="username">
                                            <h3 className='users_username'>{contact.username}</h3>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="current-user">
                        <div className="avatar">
                            <img
                                className="current_avatar"
                                src={`data:image/svg+xml;base64,${currentUserImage}`}
                                alt="avatar"
                            />
                        </div>
                        <div className="username">
                            <h3 className='users_username'>{currentUserName}</h3>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Contact
