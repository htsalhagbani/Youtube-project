import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserImg from '../assets/User.jfif';
import { FiMenu as Menu } from 'react-icons/fi';
import { AiOutlineLogout } from 'react-icons/ai';
import axios from 'axios';

const apiKey = 'AIzaSyCnVaZ9Zf7osMx1xyaJWLZineLCBMP30CA';

const fetchCategories = async () => {
    const url = `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        return response.data.items;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

function Sidebar({ toggleSidebar, isSidebarOpen, isAuthenticated, onLogout }) {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        const getCategories = async () => {
            const fetchedCategories = await fetchCategories();
            setCategories(fetchedCategories);
        };
        getCategories();
    }, []);

    const handleCategoryClick = (categoryId) => {
        navigate(`/category/${categoryId}`); 
        toggleSidebar(); 
    };

    return (
        <>
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black opacity-50 z-20" onClick={toggleSidebar} />
            )}
            <aside className={`${isSidebarOpen ? "right-0 bg-[blue] w-[280px] px-3" : "right-[-100%] w-0 px-0"} absolute h-screen top-0 bg-white overflow-hidden z-30 dark:bg-neutral-900 max-md:transition-all max-md:duration-200`}>
                <div className="pb-5 pt-2 sticky top-0 flex justify-end dark:bg-neutral-900">
                    <div className="flex gap-2 md:gap-1 items-center max-sm:w-[60%]">
                        <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-neutral-200 hover:dark:bg-neutral-700">
                            <Menu className="dark:text-neutral-400 md:text-3xl text-2xl" />
                        </button>
                    </div>
                </div>

                <div className='flex items-center flex-col p-2 gap-4 md:hidden'>
                    <img className="w-16 h-16 border border-[gray] rounded-full cursor-pointer p-0 object-cover" src={UserImg} alt="User Image" />
                    {isAuthenticated ? (
                        <>
                            <p className="font-semibold">{localStorage.getItem('username')}</p>
                            <button onClick={onLogout} className="flex items-center bg-red-500 text-white rounded-full px-4 py-2 hover:bg-red-600 transition duration-200">
                                <AiOutlineLogout className="mr-2" />
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="flex items-center bg-red-500 text-white rounded-full px-4 py-2 hover:bg-[gray] transition duration-200">
                            Login
                        </Link>
                    )}
                </div>

                <div className="overflow-y-auto h-[calc(100vh-70px)] custom_scrollbar pb-6">
                    {/* Render fetched categories */}
                    {categories.map((category) => (
                        <div key={category.id}>
                            <h4 onClick={() => handleCategoryClick(category.id)}
                                className={`flex text-[15px] font-semibold items-center py-2.5 px-3 rounded-lg hover:bg-neutral-200 mb-1 whitespace-nowrap dark:text-neutral-300 dark:hover:bg-neutral-500 cursor-pointer`}>
                                {category.snippet.title}
                            </h4>
                        </div>
                    ))}
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
