import { Link } from "react-router-dom";
import { arrow } from '../assets/icons/'
const InfoBox = ({ text, link, btnText }) => (
  <div className="info-box">
    <p className="font-medium sm:text-lg text-center">{text}</p>
    <Link to={link} className=" neo-brutalism-white neo-btn" >
            {btnText}
            <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
    </Link>        
  </div>
);

const recentContent = {
  1: (
    <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8  text-white mx-5">
      Hi, I am <span className="font-semibold">Prosper</span>
      <br />A Sofware Engineer from Nigeria
    </h1>
  ),
  2: (
    <InfoBox
      text="On my Journey to becoming a Software engineer, i've picked on many Skills along the way"
      link="/about"
      btnText="learn more"
    />
  ),
  3: (
    <InfoBox
      text="Care to see my Amazing projects?"
      link="/project"
      btnText=" my portfolio"
    />
  ),
  4: (
    <InfoBox
      text="Nedd a Project done or looking for a dev? I'm just a few keystrokes away"
      link="/contact"
      btnText="Let's talk"
    />
  ),
};

const HomeInfo = ({ currentStage }) => {
  return recentContent[currentStage] || null;
};
export default HomeInfo;
