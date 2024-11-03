import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Header = () => {
    return (
        <>
            <Head>
                <script src="https://cdn.tailwindcss.com"></script>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap"
                    rel="stylesheet"
                />
                <style>{`
                    body {
                        font-family: 'Comic Neue', cursive;
                    }
                `}</style>
            </Head>
            <div className="bg-gray-100 w-full">
                <div className="flex justify-between items-center py-4 px-10 bg-white shadow-md w-full h-20">
                    <i className="fas fa-bars text-3xl text-black"></i>
                    <h1 className="font-bold text-4xl text-black min-w-[500px]"></h1>
                    <div className="flex items-center space-x-12">
                        <Link href="/user_profile" className="flex items-center space-x-1 text-lg text-black hover:text-blue-600 transition duration-200">
                            <i className="fas fa-user text-2xl"></i>
                            <span>Profile</span>
                        </Link>
                        <Link href="/index" className="flex items-center space-x-1 text-lg text-black hover:text-blue-600 transition duration-200">
                            <i className="fas fa-sign-in-alt text-2xl"></i>
                            <span>Login</span>
                        </Link>
                        <Link href="/logout" className="flex items-center space-x-1 text-lg text-black hover:text-blue-600 transition duration-200">
                            <i className="fas fa-sign-out-alt text-2xl"></i>
                            <span>Logout</span>
                        </Link>
                    </div>
                </div>
                {/* Main Content */}
                <div className="flex flex-col items-center h-auto bg-white shadow-md my-6 relative max-w-6xl mx-auto">
                    <div className="absolute right-8 top-8 flex items-center space-x-2">
                        <i className="fas fa-bookmark text-2xl text-black"></i>
                        <span className="text-xl text-black">Following</span>
                    </div>
                    <h1 className="text-5xl mt-10 text-black">Name</h1>
                    <div className="flex justify-around w-full px-16 mt-8">
                        <div className="flex flex-row items-center space-x-2">
                            <i className="fas fa-home text-2xl text-black"></i>
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
