import Header from "../components/Header";
import ParticlesComponent from "../components/Particles";
import "../styles/homePageStyles.css";

function Home() { 
  return (
    <>
      <ParticlesComponent />
      <Header />
      <h1 className="companyName">Cool Company Name / Logo</h1>
    </>
  );
}

export default Home;
