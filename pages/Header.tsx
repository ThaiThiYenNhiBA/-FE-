import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faSignInAlt, faSignOutAlt, faBookmark, faHome } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Header = () => {
    return (
        <>
            <div className="w-full h-screen bg-gray-100">
                {/* Header Section */}
                <div className="fixed top-0 left-0 w-full flex justify-between items-center py-4 px-10 bg-white shadow-md">
                    <FontAwesomeIcon icon={faBars} className="text-3xl text-black" />
                    <div className="flex items-center space-x-12">
                        <Link href="/user_profile" className="flex items-center space-x-1 text-lg text-black hover:text-blue-600 transition duration-200">
                            <FontAwesomeIcon icon={faUser} className="text-2xl" />
                            <span>Profile</span>
                        </Link>
                        <Link href="/login" className="flex items-center space-x-1 text-lg text-black hover:text-blue-600 transition duration-200">
                            <FontAwesomeIcon icon={faSignInAlt} className="text-2xl" />
                            <span>Login</span>
                        </Link>
                        <Link href="/logout" className="flex items-center space-x-1 text-lg text-black hover:text-blue-600 transition duration-200">
                            <FontAwesomeIcon icon={faSignOutAlt} className="text-2xl" />
                            <span>Logout</span>
                        </Link>
                    </div>
                </div>

                {/* Divider Line */}
                <hr className="border-t-2 border-gray-600 mt-20" />

                {/* Navigation Bar */}
                <div className="fixed top-24 left-0 w-full flex flex-col items-center py-3 bg-white shadow-md">
                    <div className="text-4xl font-bold text-black mb-3">Name</div> {/* Centered Name */}
                    <div className="flex justify-center items-center space-x-24"> {/* Adjusted spacing here */}
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faHome} className="text-2xl text-black" />
                            <span className="text-xl text-black">Home</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-xl text-black">Comic</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-xl text-black">Story</span>
                        </div>
                    </div>
                    <div className="absolute right-8 top-3 flex items-center space-x-2">
                        <FontAwesomeIcon icon={faBookmark} className="text-2xl text-black" />
                        <span className="text-xl text-black">Following</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;