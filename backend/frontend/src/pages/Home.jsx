import Search from '../components/Search';
import AllServices from "../components/AllServices";
import AllShops from '../components/AllShops';
import AllTutors from '../components/AllTutors';
import AllEvents from '../components/AllEvents';
import NavBar from '../components/NavBar';
import img  from "../assets/man.png";

const Home = () => {
    const handleSearch = (query) => {
        console.log('Search query:', query);
        // Implement your search logic here
    };

    return (
        <div>
            <NavBar />
            
            {/* Hero Section */}
            <div className="hero-section py- bg-light">
                <div className="container">
                    <div className="row align-items-center">
                        {/* Text Section */}
                        <div className="col-md-6 text-center text-md-start">
                            <h1 className="display-5 fw-bold mb-4">Welcome to WitsCentral</h1>
                            <p className="lead mb-4">
                                Discover a world of opportunities right at your fingertips. Whether you're looking for the best shops, expert tutors, exciting events, or services to make your life easier, we have it all. 
                            </p>
                            <p className="mb-4">
                                Join our community and start exploring today! Your next great experience is just a click away.
                            </p>
                            <a href="#services" className="btn btn-primary btn-lg">Explore Now</a>
                        </div>
                        {/* Image Section */}
                        <div className="col-md-6 text-center">
                            <img src={img} alt="Man" className="img-fluid"/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services & Search Section */}
            <div className="w-100 d-flex justify-content-center flex-column align-items-center py-5 bg-white">
                <AllServices />
                <div className="w-75 px-3 mt-4">
                    <Search onSearch={handleSearch} />
                </div>
            </div>

            {/* Main Content */}
            <div className="container">
                {/* Shops Section */}
                <section className="my-5">
                    <h2 className="text-center mb-4">Shops</h2>
                    <AllShops />
                </section>

                <hr />

                {/* Tutors Section */}
                <section className="my-5">
                    <h2 className="text-center mb-4">Tutors</h2>
                    <AllTutors />
                </section>

                <hr />

                {/* Events Section */}
                <section className="my-5">
                    <h2 className="text-center mb-4">Events</h2>
                    <AllEvents />
                </section>
            </div>
        </div>
    );
};

export default Home;
