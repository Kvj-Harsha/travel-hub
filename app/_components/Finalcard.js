import React from 'react';
import { EvervaultCard, Icon } from './evervault-card';

function Finalcard() {
  const cardData = [
    {
      title: "Travel Planner",
      description: "Discover new places and experiences. Uncover hidden gems and explore the world with confidence.",
      link: "/Tripplanner"
    },
    {
      title: "Travel Connections",
      description: "Dive into the world of creativity with endless resources and inspiration to fuel your passions.",
      link: "/Connections"
    },
    {
      title: "Travel Blogs",
      description: "Stay motivated and focused with tips and tools to help you reach your personal and professional milestones.",
      link: "/Blogs"
    }
  ];

  return (
    <div className="flex justify-center p-10">
      <div className="flex gap-4">
        {cardData.map((card, index) => (
          <a 
            key={index}
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm p-4 relative h-[30rem] transition-transform transform hover:scale-105"
          >
            {/* Positioning icons in the corners */}
            <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
            <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
            <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
            <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

            {/* EvervaultCard should be passed the title text directly without braces */}
            <EvervaultCard text={card.title} />

          </a>
        ))}
      </div>
    </div>
  );
}

export default Finalcard;
