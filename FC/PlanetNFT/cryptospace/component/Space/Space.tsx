import {Canvas} from '@react-three/fiber';
import dynamic from 'next/dynamic';
import React,{CanvasHTMLAttributes, useContext, useEffect} from 'react';
import { SpaceContext } from '../../contexts';

const Stars = dynamic( ()=> import("@react-three/drei").then(mod => mod.Stars), {
    ssr: false,
});

const Planet = dynamic( ()=> import("../Planet").then(mod => mod.Planet),{
    ssr: false,
});

export const Space = (props: CanvasHTMLAttributes<any>)=>{
    const {planet, showPlanet} = useContext(SpaceContext);

    return (
     <Canvas onCreated={(state) => state.gl.setClearColor("black")} {...props}>
        <Stars />
        <Planet key={planet} name={planet} position={[0,1.8,0]}/>
        <ambientLight intensity={0.3} />
        <spotLight
            position={[100,100,80]}
            distance={200}
            intensity={100}
            angle={1}
        />
     </Canvas>
    )
}