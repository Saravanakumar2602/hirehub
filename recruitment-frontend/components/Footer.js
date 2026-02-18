export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-xl font-bold">HireHub</h2>
                        <p className="text-gray-400 text-sm mt-1">
                            Connecting talent with opportunity.
                        </p>
                    </div>

                    <div className="flex space-x-6 text-sm text-gray-400">
                        <a href="#" className="hover:text-white transition">About</a>
                        <a href="#" className="hover:text-white transition">Privacy</a>
                        <a href="#" className="hover:text-white transition">Terms</a>
                        <a href="#" className="hover:text-white transition">Contact</a>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} HireHub. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
