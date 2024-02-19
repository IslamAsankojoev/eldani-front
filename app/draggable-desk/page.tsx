'use client'

import React, {useState} from 'react';

import {Drawer} from './Drawer';

interface Props {
  children: React.ReactNode;
}

const DrawerExample = ({children}: Props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{padding: 40}}>
      <button onClick={() => setExpanded((value) => !value)}>
        {expanded ? 'Close' : 'Open'}
      </button>
        <Drawer
        expanded={expanded}
        header={'Bottom sheet'}
        onChange={setExpanded}
      >
        {children}
      </Drawer>
    </div>
  );
}

export const BottomSheet = () => {
  return <DrawerExample>
  <p style={{lineHeight: 2, color:'black'}}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac
    mauris sit amet diam pulvinar vestibulum. Sed malesuada ultrices
    hendrerit.
  </p>


  <p style={{lineHeight: 2, color:'black'}}>
    Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
    inceptos himenaeos. Nam nisi tortor, egestas volutpat tortor auctor,
    efficitur molestie urna. Vestibulum blandit erat massa, eu ornare diam
    porttitor at.
  </p>
</DrawerExample>  
}

export default BottomSheet;