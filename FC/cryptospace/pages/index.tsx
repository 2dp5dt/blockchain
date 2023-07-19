import type { NextPage } from 'next'
import styled from '@emotion/styled';
import {MenuView, Title} from '../component';
import { Button } from '@mui/material';


const Home: NextPage = () => {
  return (
      <MainView>
        <MenuView>
          <Title>CRYPTOSPACE</Title>

          <MenuButton variant="outlined" size="large">Minting Your Own Planet</MenuButton>
          <MenuButton variant="outlined" size="large">View All Planets</MenuButton>
        </MenuView>
      </MainView>
  );
}
const MainView = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuButton = styled(Button)`
  margin: 4px 0;
`;
export default Home
