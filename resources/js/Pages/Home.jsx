import React from 'react';

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
                    MarrakechNutrition
                </h1>
                <p className="text-gray-600 text-center">
                    Welcome to the new Laravel + Inertia + React + Tailwind CSS project setup.
                </p>
                <div className="mt-8 text-center">
                    <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-150">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
}
