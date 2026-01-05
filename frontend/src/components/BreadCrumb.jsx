import { Link, useLocation } from "react-router-dom";

function Breadcrumb() {
    const location = useLocation();

    // Example: "/about-us" → ["about-us"]
    const pathArray = location.pathname.split("/").filter(Boolean);

    return (

        <>



            <div className='min-h-50 sm:min-h-100 lg:min-h-145 bg-[url(/images/hero-bg1.png)] object-fit-cover flex items-center justify-center max-w-screen'>






                <div className="flex items-center gap-2 sm:gap-3 mt-10">
                    {/* Always show Home */}
                    <Link to="/" className="text-white text-lg sm:text-2xl lg:text-3xl font-semibold hover:text-gray-200">
                        Home
                    </Link>

                    {/* Show breadcrumb path */}
                    {pathArray.map((page, index) => (
                        <div key={index} className="flex items-center gap-2 sm:gap-3">
                            <span className="text-white text-lg sm:text-2xl lg:text-3xl font-semibold">
                                &gt;
                            </span>
                            <Link 
                                to={`/${pathArray.slice(0, index + 1).join('/')}`} 
                                className="text-white text-lg sm:text-2xl lg:text-3xl font-semibold capitalize hover:text-gray-200"
                            >
                                {page.replace("-", " ")}
                            </Link>
                        </div>
                    ))}
                </div>

            </div>

        </>



    );
}

export default Breadcrumb;
