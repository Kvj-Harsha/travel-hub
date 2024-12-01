import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'; // Import GitHub, LinkedIn, and Mail icons

function Procard() {
  const profileData = [
    {
      name: "K V Jaya Harsha",
      description: "A passionate traveler and tech enthusiast. Exploring the world and learning every day.",
      imageUrl: "/harsha.png",  // Replace with actual image URL
      socialLinks: {
        github: "https://github.com/Kvj-Harsha",
        linkedin: "https://linkedin.com/in/kvjharsha",
        mail: "mailto:cs23b1034@iiitr.ac.in",
      },
      tags: ["Project Lead", "HTML", "CSS", "JavaScript", "React", "Next.js", "Node.js", "UI/UX", "React Native", "Firebase", "Python"], // Example tags
    },
    {
      name: "Y Santhosh",
      description: "Software engineer with a strong focus on building efficient applications and optimizing user experience.",
      imageUrl: "/santhosh.png",  // Replace with actual image URL
      socialLinks: {
        github: "https://github.com/janesmith",
        linkedin: "https://linkedin.com/in/janesmith",
        mail: "mailto:janesmith@example.com",
      },
      tags: ["JavaScript", "React", "Next.js", "Node.js"], // Example tags
    },
    {
      name: "G Jashwanth Naik",
      description: "A passionate developer focused on creating web applications that solve real-world problems.",
      imageUrl: "/jash.jpg",  // Replace with actual image URL
      socialLinks: {
        github: "https://github.com/johndoe",
        linkedin: "https://linkedin.com/in/johndoe",
        mail: "mailto:johndoe@example.com",
      },
      tags: ["Python", "Django", "JavaScript", "AI"], // Example tags
    },
    {
      name: "K Vijay Narasimha Goud",
      description: "A tech enthusiast who loves designing and developing clean, scalable web solutions.",
      imageUrl: "/vijay.jpg",  // Replace with actual image URL
      socialLinks: {
        github: "https://github.com/janesmith",
        linkedin: "https://linkedin.com/in/janesmith",
        mail: "mailto:janesmith@example.com",
      },
      tags: ["HTML", "CSS", "React", "UI/UX Design"], // Example tags
    },
    {
      name: "N S Murthy",
      description: "A front-end developer with a focus on modern JavaScript frameworks and responsive design.",
      imageUrl: "/1.jpg",  // Replace with actual image URL
      socialLinks: {
        github: "https://github.com/johndoe",
        linkedin: "https://linkedin.com/in/johndoe",
        mail: "mailto:johndoe@example.com",
      },
      tags: ["JavaScript", "React", "Vue.js", "SASS"], // Example tags
    },
    {
      name: "S Jaswanth",
      description: "A passionate full-stack developer who enjoys exploring new technologies and building innovative solutions.",
      imageUrl: "/jaswant.png",  // Replace with actual image URL
      socialLinks: {
        github: "https://github.com/janesmith",
        linkedin: "https://linkedin.com/in/janesmith",
        mail: "mailto:janesmith@example.com",
      },
      tags: ["Next.js", "GraphQL", "TypeScript", "Node.js"], // Example tags
    },
  ];

  return (
    <div>
  <h1 className="text-6xl font-bold text-center text-white hover:neon-text">
    Contributors
  </h1>



    <div className="p-10">
      <div className="grid grid-cols-3 gap-6">
        {profileData.map((profile, index) => (
          <div
            key={index}
            className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-center max-w-sm p-6 relative h-[30rem] transition-transform transform hover:scale-105"
          >
            {/* Profile Image */}
            <img
              src={profile.imageUrl}
              alt={profile.name}
              className="rounded-full w-40 h-40 object-cover border-2 border-black dark:border-white mb-4"
            />

            {/* Profile Name */}
            <h2 className="text-xl text-white font-semibold mb-2">{profile.name}</h2>

            {/* Profile Description */}
            <p className="text-center text-sm text-gray-700 dark:text-gray-300 mb-4">
              {profile.description}
            </p>

            {/* Tags */}
            <div className="flex justify-center items-center flex-wrap gap-2 mb-4">
              {profile.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`border px-3 py-1 text-xs font-semibold rounded-md ${tag === "Project Lead" ? "bg-blue-500 text-white" : "border-white text-white"}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              {Object.keys(profile.socialLinks).map((key, i) => (
                <a
                  key={i}
                  href={profile.socialLinks[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black dark:text-white hover:text-blue-500 transition-colors"
                >
                  {/* Social Media Icons using React Icons */}
                  {key === "github" && <FaGithub className="h-6 w-6" />}
                  {key === "linkedin" && <FaLinkedin className="h-6 w-6" />}
                  {key === "mail" && <FaEnvelope className="h-6 w-6" />}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Procard;
