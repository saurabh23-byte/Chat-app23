import React from 'react';
import OtherUser from './OtherUser';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import { useSelector } from "react-redux";

const OtherUsers = () => {
    useGetOtherUsers();

    const { otherUsers } = useSelector(store => store.user);

    // ✅ proper safety check
    if (!Array.isArray(otherUsers)) {
        return null; // or loading spinner
    }

    return (
        <div className='overflow-auto flex-1'>
            {otherUsers.map(user => (
                <OtherUser key={user._id} user={user} />
            ))}
        </div>
    );
};

export default OtherUsers;
