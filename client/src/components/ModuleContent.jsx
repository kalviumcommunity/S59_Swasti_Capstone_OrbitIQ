import React, { useEffect, useState } from 'react'
import Rokect from "../assets/planet (1).png"
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "../css/Module.css"
import ProgressBar from "@ramonak/react-progress-bar";
import { useParams } from 'react-router-dom';


const API_URI = `${import.meta.env.VITE_API_URI}/learning`;
const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 600,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));



function ModuleContent() {
  const { id } = useParams();
  const [module, setModule] = useState([]);
  const [learningUnits, setLearningUnits] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchModuleData = async () => {
      try {
        const response = await fetch(`${API_URI}/module/${id}`)
        if (!response.ok) {
          setError("Response was not ok")
        }
        const data = await response.json();
        console.log(data)
        setModule(data);
        setLearningUnits(data.learningUnits)
      }
      catch (error) {
        setError("Failed to fetch module data.")

      }
    }
    fetchModuleData();
  }, [id])

  return (
    <div className='intro-main'>
      <div className='Nav-learn'>
        <h1>{module.title}</h1>
        <HtmlTooltip
          title={
            <React.Fragment>
              <Typography color="inherit" >Get Started with Basics of Outer Space</Typography>
              <Typography >1. <em>Explore Units:</em> Review the learning units.</Typography>
              <Typography>2. <em>Engage:</em> Interact with content like videos or activities.</Typography>
              <Typography>3. <em>Quiz Yourself:</em> Test understanding with quizzes.</Typography>

              <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
              {"It's very engaging. Right?"}
            </React.Fragment>
          }
        >
          <Button><i className='bx bxs-rocket'></i></Button>
        </HtmlTooltip>
      </div>


      <div className='learning-levels'>

        {learningUnits.map((data, index) => (
          <div className='unit-level-box' key={index}>
            <img src={Rokect} />
            <div className='unit-level'>
              <h3>{data.title}</h3>
              <ProgressBar completed={10} />
            </div>
          </div>
        ))}

      </div>
      {/* 
            <div className='score-tracker'>
                <div style={{ width: 200, height: 200 }} >
                <CircularProgressbar  value={percentage} text={`${percentage}%`}
                styles={buildStyles({
                    rotation: 0.25,
                    strokeLinecap: 'round',
                    textSize: '16px',
                    pathTransitionDuration: 0.5,
                    pathColor: `rgba(255, 96, 38, ${percentage / 20})`,
                    textColor: '#f88',
                    trailColor: 'rgba(255, 96, 38,0.4)',
                  })} />
                </div>

                

            </div> */}

    </div>
  )
}

export default ModuleContent