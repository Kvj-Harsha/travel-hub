import React from 'react';
import Headerdarknext from '../_components/Headerdarknxt';
import Heroabout from '../_components/Heroabout';
import { TextHoverEffectDemo } from '../_components/greattext';
import Procard from '../_components/Procard';
import Newcard from '../_components/Newcard';

import Music from '../_components/Music'

function About() {
  return (
    <div className="bg-gray-900 text-white">
      {/* Header */}
      <Headerdarknext />
      <Music/>
      {/* Hover Effect Text */}
      <TextHoverEffectDemo />
      
      {/* New Card Component */}
      <Newcard />
      


      {/* Procard Section */}
      <div className="flex items-center justify-center min-h-screen bg-[#111827]">
        <Procard />
      </div>
    </div>
  );
}

export default About;
