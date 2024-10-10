import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext.jsx";

function HomePage() {
  const {currentUser} = useContext(AuthContext)
  console.log(currentUser)
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
          <p>
  Welcome to <strong>CADE Estate</strong>! Whether you're searching for your dream property or looking to explore real estate opportunities, we're here to make the process smooth and rewarding. Feel free to browse and reach out if you need any assistance!
</p>

          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>2+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>CADE</h1>
              {/* <h2>Estate</h2> */}
            </div>
            <div className="box">
              <h1>100+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
