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
            <NavBar/>
            <div style={{paddingTop: '25px',paddingBottom: '25px'}} className="w-100 d-flex justify-content-center flex-column align-items-center">
                <AllServices/>
                <div className='w-75 px-1'>
                    <Search onSearch={handleSearch} />
                </div>
            </div>
            <div className="container">
                <AllShops/>
                <hr/>
                <AllTutors/>
                <hr/>
                <AllEvents/>
            </div>
        </div>
    );
};

export default Home;
