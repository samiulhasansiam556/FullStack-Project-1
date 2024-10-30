

import NavOut from '../../components/nav/NavOut';
import backgroundImage from '../../assets/background.jpg'; 

function HomeOut() {
    return (
        <div 
            className="min-h-screen bg-cover bg-center flex flex-col text-white"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <NavOut /> 
            <div className="flex-grow flex flex-col justify-center items-center mt-10">
                <div className="text-center p-5 bg-black bg-opacity-50 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-bold mb-4">Welcome to Your Todo App</h1>
                    <p className="text-lg mb-8">Organize your tasks efficiently and boost your productivity.</p>
                    <p className="text-md">Sign in or Sign up to get started!</p>
                </div>
            </div>
        </div>
    );
}

export default HomeOut;