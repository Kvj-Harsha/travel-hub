import React from "react";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Sec1 from "./_components/sec1";
import Sec2 from "./_components/Sec2";
import { TextHoverEffectDemo1 } from './_components/greattext2';

function page() {
  return (
    <div>
     <Header />
      <Hero />
      <TextHoverEffectDemo1/>
      <Sec1 />
      {/* <Sec2/>  */}
    </div>
  );
}

export default page;
