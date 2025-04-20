import { useEffect, useState } from "react";
import axios from "axios";

function EditProfile({ onClose }) {
    const userId = localStorage.getItem('Id');
    const [user, setUser] = useState({
        username: '',
        email: '',
        firstname: '',
        lastname: '',
        goal: 'gain', // Default value
        goal_weight: '',
        weight_now: '',
        img: '', // URL or file
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://admin.kevfitness.com/api/lietotajs?user_id=${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
                setUser(response.data); // Store user data in state
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError(err.response?.data?.message || 'An error occurred');
            }
        };

        fetchUserData();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: type === "file" ? files[0] : value, // Handle file input
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const formData = new FormData();
        formData.append('firstname', user.firstname);
        formData.append('lastname', user.lastname);
        formData.append('email', user.email);
        formData.append('username', user.username);
        formData.append('goal_weight', user.goalWeight);
        formData.append('weight_now', user.weightNow);
        formData.append('goal', user.goal);

        if (user.image) {
            formData.append('img', user.image);
        }

        try {
            const response = await axios.put(`https://admin.kevfitness.com/api/lietotajs/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Important for file uploads
                    'Authorization': `Bearer ${user.token}` // Include authorization if needed
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };



    if (error) {
        return <div className="text-red-500 mb-4">{error}</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col relative top-10 p-6 bg-[#171717] rounded-lg shadow-md w-1/3 mx-auto">
            <button onClick={onClose} className="absolute top-0 right-2 text-[30px] text-gray-600 hover:text-red-500">
                &times;
            </button>

            <h2 className="text-xl text-white mb-4 text-center">Edit Profile</h2>

            <div className="mb-2 flex space-x-4">
                <div className="flex-1">
                    <label htmlFor="firstname" className="block text-gray-300 mb-1">First Name</label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={user.firstname}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        required
                        className="w-full p-2 border border-[#303030] rounded bg-[#171717] text-white focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex-1">
                    <label htmlFor="lastname" className="block text-gray-300 mb-1">Last Name</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={user.lastname}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        required
                        className="w-full p-2 border border-[#303030] rounded bg-[#171717] text-white focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>

            <div className="mb-2">
                <label htmlFor="username" className="block text-gray-300 mb-1">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    required
                    className="w-full p-2 border border-[#303030] rounded bg-[#171717] text-white focus:outline-none focus:border-blue-500"
                />
            </div>

            <div className="mb-2">
                <label htmlFor="email" className="block text-gray-300 mb-1">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full p-2 border border-[#303030] rounded bg-[#171717] text-white focus:outline-none focus:border-blue-500"
                />
            </div>

            <div className="mb-2">
                <label htmlFor="goal" className="block text-gray-300 mb-1">Goal</label>
                <select
                    id="goal"
                    name="goal"
                    value={user.goal}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-[#303030] rounded bg-[#171717] text-white focus:outline-none focus:border-blue-500"
                >
                    <option value="gain">Gain</option>
                    <option value="maintain">Maintain</option>
                    <option value="lose">Lose</option>
                </select>
            </div>

            <div className="mb-2 flex space-x-4">
                <div className="flex-1">
                    <label htmlFor="goal_weight" className="block text-gray-300 mb-1">Goal Weight</label>
                    <input
                        type="number"
                        id="goal_weight"
                        name="goal_weight"
                        value={user.goal_weight}
                        onChange={handleChange}
                        placeholder="Enter your goal weight"
                        required
                        className="w-full p-2 border border-[#303030] rounded bg-[#171717] text-white focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex-1">
                    <label htmlFor="weight_now" className="block text-gray-300 mb-1">Current Weight</label>
                    <input
                        type="number"
                        id="weight_now"
                        name="weight_now"
                        value={user.weight_now}
                        onChange={handleChange}
                        placeholder="Enter your current weight"
                        required
                        className="w-full p-2 border border-[#303030] rounded bg-[#171717] text-white focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>

            <div className="mb-2">
                <label htmlFor="img" className="block text-gray-300 mb-1">Profile Image</label>
                <input
                    type="file"
                    id="img"
                    name="img"
                    onChange={handleChange}
                    className="w-full p-2 border border-[#303030] rounded bg-[#171717] text-white focus:outline-none focus:border-blue-500"
                />
            </div>

            <button type="submit" className="mt-2 bg-[#202020] text-white p-2 rounded hover:bg-green-600 transition-colors">
                Save Changes
            </button>
        </form>
    );
}

export default EditProfile;
