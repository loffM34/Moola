import Header from "../components/Header";
import ParticlesComponent from "../components/Particles";
import "../styles/homePageStyles.css";
import logo from '../styles/images/MoolaLogoTransparent.png'

function Home() { 
  return (
    <>
      <ParticlesComponent />
      <Header />
      <div className="homeContent">
      <img className="logo" src={logo}></img>
      <h1 className="companyName">moola</h1>
      </div>
    </>
  );
}

export default Home;
