import React, { useState } from 'react';
import { FiMenu as Menu, FiSearch as Search } from 'react-icons/fi';
import Logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import UserImg from '../assets/User.jfif';


const Navbar = ({ toggleSidebar, setSearchQuery  }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

   



    const handleSearch = (e) => {
        e.preventDefault(); 
        const trimmedTerm = searchTerm.trim(); 
        if (trimmedTerm) {
            setSearchQuery(trimmedTerm); 
            navigate('/'); 
            setSearchTerm(''); 
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch(event); 
        }
    };

   
    return (
      <>
        <header className="sticky top-0 h-[10vh] z-10 bg-white dark:bg-neutral-900 flex items-center">
            <nav className="flex items-center justify-between w-full h-full">
                {/* User Image */}
       <button className="btn ml-1 md:ml-8 max-sm:hidden text-xl" onClick={() => navigate('/login')}>Login</button>
                {/* Search Input Center */}
                <div className="h-[60%] flex gap-3 justify-center w-[70%] max-lg:w-[500px] max-md:hidden">
                    <form className="flex w-[50%]" onSubmit={handleSearch}>
                        <input
                            className="border border-neutral-300 w-full h-full rounded-l-full px-5 outline-none focus:border-blue-500 dark:bg-neutral-900 dark:border-neutral-500 dark:focus:border-blue-500 dark:text-neutral-300"
                            type="search"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown} // Listen for keydown events
                            required
                        />
                        <button
                            type="submit"
                            className="border border-neutral-300 px-7 border-l-0 rounded-r-full hover:bg-neutral-100 dark:border-neutral-500 hover:dark:bg-neutral-700"
                        >
                            <Search className="dark:text-neutral-400 text-xl" />
                        </button>
                    </form>
                </div>

                {/* Responsive Search Bar */}
                <div className="flex items-center gap-4 max-sm:w-full max-sm:h-full">
                    <div className="flex gap-3 md:hidden w-full h-[70%] justify-center items-center">
                        <form className="flex w-[90%] h-[80%]" onSubmit={handleSearch}>
                            <input
                                className="border border-neutral-300 w-full h-full rounded-l-full px-2 outline-none focus:border-blue-500 dark:bg-neutral-900 dark:border-neutral-500 dark:focus:border-blue-500 dark:text-neutral-300"
                                type="search"
                                placeholder="Search"
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyDown} // Listen for keydown events
                                required
                            />
                            <button
                                type="submit"
                                className="border border-neutral-300 px-2 border-l-0 rounded-r-full hover:bg-neutral-100 dark:border-neutral-500 hover:dark:bg-neutral-700"
                            >
                                <Search className="dark:text-neutral-400 text-md" />
                            </button>
                        </form>
                    </div>

                    {/* Menu and Logo Section */}
                    <div className="flex gap-2 h-full md:mr-4 md:gap-4 items-center max-sm:w-[40%]">
                        <div className="flex items-center gap-2 h-full w-full bg-red-500" >
                            <img
                                src={Logo}
                                alt="Logo"
                                className='md:w-[100%] w-[100%] md:h-[10vh] h-[10vh]'
                            />
                        </div>
                        <button
                            onClick={toggleSidebar}
                            className="p-2 rounded-full hover:bg-neutral-200 hover:dark:bg-neutral-700"
                        >
                            <Menu className="dark:text-neutral-400 md:text-3xl" />
                        </button>
                    </div>
                </div>
            </nav>
        </header>
                    </>
    );
};

export default Navbar;
