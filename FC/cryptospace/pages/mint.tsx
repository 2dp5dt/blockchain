import React, { useContext, useEffect, useState } from 'react';
import {NextPage} from 'next';
import styled from '@emotion/styled';
import { MenuView, Title } from '../component';
import Link from 'next/link';
import { Button } from '@mui/material';
import { PlanetList } from '../component/Planet';
import { SpaceContext } from '../contexts';
import { useRouter } from 'next/router';


const Mint: NextPage = ()=>{
    const router = useRouter();
    const {showPlanet, clearPlanet} = useContext(SpaceContext);
    const [planetIndex, setPlanetIndex] = useState(-1);
    const showRandomPlanet = ()=>{
        setPlanetIndex(Math.floor(Math.random() * PlanetList.length));
    };

    useEffect(()=>{
        if(planetIndex >=0){
            showPlanet(PlanetList[planetIndex])
        }

        return () => clearPlanet();
    }, [planetIndex, showPlanet, clearPlanet]);

    useEffect(()=>{
        const interval = setInterval(()=> showRandomPlanet(), 2000);
        showRandomPlanet();

        return ()=> clearInterval(interval);
    }, []);

    return (
        <MainView>
          <MenuView>
            <Title>Mint your own PLANET!</Title>

                <Description>
                    You can mint a planet NFT by paying <b>0.01ETH</b><br />
                    You will get a random planet.<br />
                    Please press below  button to  mint!
                </Description>

                <ButtonView>
                    <MenuButton variant="contained" size="large">
                        MINT PLANET</MenuButton>
                    <MenuButton variant="outlined" size="large" 
                        onClick={()=>router.back()}> GO PREVIOUS</MenuButton>
                </ButtonView>
          </MenuView>
        </MainView>
    );
  };

  const ButtonView = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  `;

  const Description = styled.div`
   font-size: 16px;
   line-height: 24px;
   font-weight: 100;
   color: #ffffff;
   text-align: center;
  `;

  const MainView = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
  `;
  
  const MenuButton = styled(Button)`
    margin: 4px 0;
  `;


export default Mint;