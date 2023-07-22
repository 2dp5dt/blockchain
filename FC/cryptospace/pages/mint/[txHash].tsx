import styled from '@emotion/styled';
import {useRouter} from 'next/router';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SpaceContext, Web3Context } from '../../contexts';
import { usePlanetContract } from '../../hooks';
import { PlanetName } from '../../component/Planet';
import { CircularProgress } from '@mui/material';
import { Title } from '../../component';

type TxStatus = 'PENDING' | 'MINING' | 'MINED' | 'WRONG_TX';

const MintTx = () =>{
    const router = useRouter();
    const {txHash } = router.query;

    const [status,setStatus] = useState<TxStatus>('PENDING');
    const {web3} = useContext(Web3Context);
    const {contractAddress, tokenURI} = usePlanetContract(web3);
    const { showPlanet} = useContext(SpaceContext);
    const [metadata, setMetadata] = useState();
    const [owner, setOwner] = useState("");
    const [tokenId, setTokenId] = useState<number | null>(null);

    const checkTx = useCallback(async ()=>{
        if(web3 && txHash){
            const receipt = await web3.eth.getTransactionReceipt(txHash as string);
            console.log(receipt);
            if (receipt){
                const mintingEvent = receipt.logs.filter((log)=> log.topics[0] 
                === web3.utils.sha3("Transfer(address,address,uint256)"))[0];

                const isMintingTx = receipt.to.toLowerCase() 
                === contractAddress.toLowerCase() && mintingEvent;

                if (isMintingTx){
                    const tokenId = mintingEvent.topics[3];
                    const uri = await tokenURI(tokenId);

                    const metadataQuery = await fetch(uri);
                    const metadata = await metadataQuery.json();

                    console.log(metadata);
                    setMetadata(metadata);

                    const owner = mintingEvent.topics[2];
                    setOwner(owner.slice(-40));
                    console.log(tokenId);
                    setTokenId(web3.utils.hexToNumber(tokenId));

                    const planetType = metadata.planetType as PlanetName;
                    showPlanet(planetType);

                    setStatus('MINED');
                }
            }else{
                setStatus('MINING');
            }
        }
    }, [web3,txHash,contractAddress,showPlanet,tokenURI]);

    useEffect(()=>{
        if(status ==="PENDING"){
            checkTx();
            return;
        }
        if (status === "MINING"){
            const interval = setInterval(()=>checkTx(), 5000);
            return ()=> clearInterval(interval);
        }
    }, [status, checkTx]);
    

    return <TxView>
        <DownMenuView>
            {status === "MINING"&& (<>
              <Progress />
              <Description>Wait until transaction is mined...</Description></>)}
            {status === "WRONG_TX" && (<>
              <Title>Wrong Transaction</Title>
              <Description>It("'")s not a mining Transaction.</Description></>)}
            {status === "MINED" && (<>
              <Title>Planet #{tokenId}</Title></>)}
        </DownMenuView></TxView>
}

const DownMenuView = styled.div`
 margin-top: 320px;
 align-items: center;
`;

const TxView = styled.div`
 width: 100%;
 height: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 color: #ffffff;
`;

const Progress = styled(CircularProgress)`
 margin-top: 24px;
 margin-bottom: 24px;
`;



const Description = styled.div`
 width: 100%;
 margin-top: 8px;
 color: #ccc;
 text-align: center;
`;

export default MintTx;