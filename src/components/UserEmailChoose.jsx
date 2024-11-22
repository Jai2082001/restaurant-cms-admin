import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const UserTable = ({setIsOpen, setEmailUsers, SendEmails}) => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [users, setUsers] = useState([])
    const [error, setError] = useState(false)

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACK_END_LINK}/api/user/getUsers`).then((response)=>{
            setUsers(response.data.users)
        })
    }, [])

    setEmailUsers(selectedUsers)

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedUsers(users.map((user) => user._id));
        } else {
            setSelectedUsers([]);
        }
    };

    const handleSelectUser = (id) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((userId) => userId !== id)
                : [...prevSelected, id]
        );
    };
    console.log(error)

    const isSelectedAll = users.length > 0 && selectedUsers.length === users.length;
    return (
        
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
                    <div className="flex justify-between items-center border-b pb-4 mb-4">
                 
                        <h2 className="text-lg text-black font-semibold">Select Users</h2>
                        {error&& <p className='text-red-600'>{error}</p>}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            &times;
                        </button>
                    </div>

                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 text-black px-4 py-2">#</th>
                                <th className="border border-gray-300 text-black px-4 py-2">Name</th>
                                <th className="border border-gray-300 text-black px-4 py-2">Email</th>
                                <th className="border border-gray-300 px-4 py-2">
                                    <input
                                        type="checkbox"
                                        checked={isSelectedAll}
                                        onChange={handleSelectAll}
                                        className="cursor-pointer"
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id} className="odd:bg-gray-100 even:bg-white">
                                    <td className="border text-black border-gray-300 px-4 py-2 text-center">
                                        {index + 1}
                                    </td>
                                    <td className="border text-black border-gray-300 px-4 py-2">
                                        {user.name}
                                    </td>
                                    <td className="border text-black border-gray-300 px-4 py-2">
                                        {user.email}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.includes(user._id)}
                                            onChange={() => handleSelectUser(user._id)}
                                            className="cursor-pointer"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Modal Footer */}
                    <div className="mt-4 flex justify-end gap-2">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 bg-gray-300 rounded-md shadow hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                console.log("Selected User IDs:", selectedUsers);
                                if(selectedUsers.length > 0){
                                    SendEmails()
                                    setIsOpen(false);
                                }else{
                                    setError(true)
                                }
                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                        >
                            Send Email
                        </button>
                    </div>
                </div>
            </div>
    );
};

export default UserTable;

