import type { NextPage } from 'next'
import styled from '@emotion/styled';
import {MenuView, Title} from '../component';
import { Button } from '@mui/material';
import Link from 'next/link';


const Home: NextPage = () => {
  return (
      <MainView>
        <MenuView>
          <Title>CRYPTOSPACE</Title>

          <Link href="/mint">
            <MenuButton variant="outlined" size="large">Minting Your Own Planet</MenuButton>
          </Link>

          <Link href="/list">
            <MenuButton variant="outlined" size="large">View All Planets</MenuButton>
          </Link>
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
