import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faSignInAlt, faSignOutAlt, faBookmark, faHome } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Header = () => {
    return (
        <>
            <div className="bg-gray-100 top-0">
                <div className="flex justify-between items-center py-4 px-10 bg-white shadow-md h-20">
                    <FontAwesomeIcon icon={faBars} className="text-3xl text-black" />
                    <h1 className="font-bold text-4xl text-black min-w-[500px]"></h1>
                    <div className="flex items-center space-x-12">
                        <Link href="/user_profile" className="flex items-center space-x-1 text-lg text-black hover:text-blue-600 transition duration-200">
                            <FontAwesomeIcon icon={faUser} className="text-2xl" />
                            <span>Profile</span>
                        </Link>
                        <Link href="/Login" className="flex items-center space-x-1 text-lg text-black hover:text-blue-600 transition duration-200">
                            <FontAwesomeIcon icon={faSignInAlt} className="text-2xl" />
                            <span>Login</span>
                        </Link>
                        <Link href="/logout" className="flex items-center space-x-1 text-lg text-black hover:text-blue-600 transition duration-200">
                            <FontAwesomeIcon icon={faSignOutAlt} className="text-2xl" />
                            <span>Logout</span>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-center bg-white shadow-md my-6 relative max-w-6xl mx-auto">
                    <div className="absolute right-8 top-8 flex items-center space-x-2">
                        <FontAwesomeIcon icon={faBookmark} className="text-2xl text-black" />
                        <span className="text-xl text-black">Following</span>
                    </div>
                    <h1 className="text-5xl mt-10 text-black">Name</h1>
                    <div className="flex justify-around w-full px-16 mt-8">
                        <div className="flex flex-row items-center space-x-2">
                            <FontAwesomeIcon icon={faHome} className="text-2xl text-black" />
                            <span className="text-xl text-black">Home</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-xl text-black">Comic</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-xl text-black">Story</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
