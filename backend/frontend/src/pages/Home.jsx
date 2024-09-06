import Search from '../components/Search';
import AllServices from "../components/AllServices";
import AllShops from '../components/AllShops';
import AllTutors from '../components/AllTutors';
import AllEvents from '../components/AllEvents';
import NavBar from '../components/NavBar';

const Home = () => {
    const handleSearch = (query) => {
        console.log('Search query:', query);
        // Implement your search logic here
    };

    return (
        <div>
            <NavBar />
            
            {/* Hero Section */}
            <div className="hero-section text-center py-5 bg-light">
                <h1>Welcome to WitsCentral</h1>
                <p className="lead">Your one-stop platform for shops, tutors, events, and more!</p>
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
