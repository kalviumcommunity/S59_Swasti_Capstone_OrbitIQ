import React from 'react'
import Rokect from  "../assets/planet (1).png"
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { CircularProgressbar ,buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "../css/Module.css"
import ProgressBar from "@ramonak/react-progress-bar";

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
  


function introModule() {
    return (
        <div className='intro-main'>
            <div className='Nav-learn'>
            <h1>Introduction to Outer Space</h1>
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
                <div className='unit-level-box'>
                    <img src={Rokect}/>
                    <div className='unit-level'>
                    <h3>What is Outer Space?</h3>
                    <ProgressBar completed={10} />
                    </div>
                    
                </div>
                <div className='unit-level-box'>
                    <img src={Rokect}/>
                    <div className='unit-level'>
                    <h3>What is Outer Space?</h3>
                    <ProgressBar completed={60} />
                    </div>
                    
                </div>
                <div className='unit-level-box'>
                    <img src={Rokect}/>
                    <div className='unit-level'>
                    <h3>What is Outer Space?</h3>
                    <ProgressBar completed={60} />
                    </div>
                    
                </div>
                <div className='unit-level-box'>
                    <img src={Rokect}/>
                    <div className='unit-level'>
                    <h3>What is Outer Space?</h3>
                    <ProgressBar completed={60} />
                    </div>
                    
                </div>

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

export default introModule