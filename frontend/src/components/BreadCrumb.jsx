import { Link, useLocation } from "react-router-dom";

function Breadcrumb() {
    const location = useLocation();

    // Example: "/about-us" → ["about-us"]
    const pathArray = location.pathname.split("/").filter(Boolean);

    return (

        <>



            <div className='min-h-50 sm:min-h-100 lg:min-h-145 bg-[url(/images/hero-bg1.png)] object-fit-cover flex items-center justify-center max-w-screen'>






                <div className="flex gap-5 mt-10">


                    {/* Always show Home */}
                    <div>
                        <h2 className="text-white  text-lg sm:text-2xl lg:text-3xl text-center font-semibold">

                            <Link to="/">Home</Link>

                        </h2>

                    </div>

                    {/* Show current page */}
                    <div >
                        {pathArray.map((page, index) => (
                            <span key={index} className="gap-2 sm:gap-5 capitalize flex text-white text-lg sm:text-2xl lg:text-3xl text-center font-semibold">
                                {" > "}

                                <h2 className="text-white text-lg sm:text-2xl lg:text-3xl text-center font-semibold">
                                    <Link to={`/${page}`}>
                                        {page.replace("-", " ")}
                                    </Link>
                                </h2>
                            </span>
                        ))}
                    </div>




                </div>

            </div>

        </>



    );
}

export default Breadcrumb;
