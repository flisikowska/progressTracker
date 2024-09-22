import React, {useEffect} from 'react';
import styled from 'styled-components';
import {PersonRunning} from '@styled-icons/fa-solid/PersonRunning';
import {SportBasketball} from '@styled-icons/fluentui-system-regular/SportBasketball';
import {Tennisball} from '@styled-icons/ionicons-solid/Tennisball';
import {Volleyball} from '@styled-icons/fa-solid/Volleyball';
import { ResizeGridItems } from "../helpers/functions"
import {CloseOutline} from '@styled-icons/evaicons-outline/CloseOutline';
import { MinutesToFormattedTime } from '../helpers/functions';

import yoga from '../assets/yoga.png';
import walking from '../assets/walking.png';
import tennis from '../assets/tennis.png';
import swimming from '../assets/swimming.png';
import pilates from '../assets/pilates.png';
import soccer from '../assets/soccer.png';
import basketball from '../assets/basketball.png';

const StyledActivitiesWrapper = styled.div`
  margin: 20px auto;
  width:550px;
  height:400px;
  overflow-y:auto;
  place-items:center;
  display: grid;  
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  grid-auto-rows: 0; 
  @media(max-width:650px){
    gap:10px;
    width:100%;
  }
    @media(max-width:420px){
    gap:10px;
    width:100%;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));

  }
  >div:first-child{
    border:2px solid #888;
    >div{
      >p{
        color:#000;
        font-size:1rem;
      }
      margin-bottom:10px;
    }
    >h1{
      font-size:1.5rem;
      @media(max-width:900px){
        font-size:1.2rem;
      }
    }
  }
`;

const StyledActivity=styled.div`
    width:150px;
    border:2px solid #bbb;
    border-radius:4px;
    padding:10px;
    text-align:center;
    cursor:default;
    grid-row-end: span 10;
    >svg{
      color: rgba(86, 186, 119);
      margin:15px;
    }
    @media(max-width:420px){
      width:130px;
    }
  #summary{
    >p{
      font-size:5rem;
    }
  }
`;

const ActivityTitle= styled.h1`
    padding:0;
    font-weight:600;
    font-size:1.1rem;
    margin: 0 auto;
    text-align:center;
    @media(max-width:450px){
        font-size:0.85rem;
    }
`;

const StyledHeader=styled.div`
display:flex;
flex-flow:row nowrap;
align-items:center;
justify-content:space-between;
  >p{
    font-size:0.8rem;
    padding:0;
    color:#aaa;
  }
  >svg{
    color:#aaa;
    width:25px;
    height:25px;
    cursor:pointer;
  }
`

const StyledIcon=styled.img`
  width:40px;
  height:40px;
  margin:10px 0;
`;

function UserActivities({deleteActivity, activities}){
  const iconMap = {
    tennis: tennis,
    yoga: yoga,
    walking: walking,
    soccer: soccer,
    swimming: swimming,
    basketball: basketball,
    pilates: pilates,
  };
    useEffect(() => {
        ResizeGridItems("activities")
      })
    return(
      <StyledActivitiesWrapper className='scrollable activities'>
        <StyledActivity id="summary" className='grid-item'><StyledHeader><p>Łącznie</p></StyledHeader><ActivityTitle>{MinutesToFormattedTime(activities.reduce((total, activity) => total + activity.activity_amount, 0))}</ActivityTitle></StyledActivity>
        {activities &&
          activities.map(
            (
              {
                activity_id,
                activity_type_name,
                activity_amount,
                activity_type_icon,
              }, key
            ) => (
              <StyledActivity key={key}  className='grid-item'>
                <StyledHeader><p>{MinutesToFormattedTime(activity_amount)}</p><CloseOutline onClick={()=> deleteActivity(activity_id)}/></StyledHeader>
                <StyledIcon src={iconMap[ activity_type_icon]} alt={activity_type_icon} />
                <ActivityTitle>{activity_type_name}</ActivityTitle>
              </StyledActivity>
            ),
          )}
      </StyledActivitiesWrapper>
    );
};

export default UserActivities;
