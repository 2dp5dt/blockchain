import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Space} from '../component';
import styled from '@emotion/styled'
import { SpaceContextProvider, Web3ContextProvider } from '../contexts';

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Web3ContextProvider>
        <SpaceContextProvider>
          <AppView>
            <SpaceWrapper>
              <Space />
            </SpaceWrapper>
            <ComponentWrapper>
              <Component {...pageProps} />
            </ComponentWrapper>
          </AppView>
        </SpaceContextProvider>
      </Web3ContextProvider>
  );
}
const AppView = styled.div`
  width: 100%;
  height: 100%;
`;

const SpaceWrapper = styled.div`
  position: absolute;
  z-Index: -1;
  width: 100%;
  height: 100%;
  `;

const ComponentWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding : 20px;
  overflow-y: auto;
  `;
export default MyApp
