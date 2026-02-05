import React from "react";
import Profile from "../../assets/images/profile.png";
import Texture from "../../assets/images/green-effect2.png";

const teamMembers = [
  { name: "Abebe Tesfaye", position: "Lead Veterinarian" },
  { name: "Selamawit Bekele", position: "AgTech Developer" },
  { name: "Kebede Alemu", position: "Community Coordinator" },
  { name: "Hanna Girma", position: "UX Designer" },
  { name: "Mulugeta Dinku", position: "Operations Manager" },
];

const Our_Team = () => {
  return (
    <div className="md:p-10 flex flex-col items-center justify-center">
      <h2 className="font-bold text-4xl text-center my-6">Meet Team</h2>
      <p className="my-5 px-6 text-center max-w-4xl mx-auto">
        Our team brings together young innovators, agricultural experts, and technology professionals who share the same goal: creating practical solutions for Ethiopia’s livestock challenges. With combined experience in veterinary services, software development, and rural community engagement, we are committed to building a platform that truly supports farmers.
      </p>

      {/* Background texture */}
      <div className="relative overflow-hidden rounded-2xl bg-white/80 w-full flex justify-center">
        <img
          src={Texture}
          alt="texture"
          className="absolute inset-0 w-full h-full object-cover opacity-80 z-0"
        />

        {/* Team grid */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-8 p-6 md:p-10 justify-items-center">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative aspect-square rounded-full overflow-hidden shadow-lg flex flex-col items-center justify-center text-center w-32 sm:w-40 md:w-48"
            >
              {/* Profile image */}
              <img
                src={Profile}
                alt={member.name}
                className="absolute inset-0 w-full h-full object-cover z-0 transition duration-300 group-hover:brightness-75"
              />

              {/* Overlay text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-semibold bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 px-4">
                <h3 className="text-sm sm:text-base md:text-lg">{member.name}</h3>
                <p className="text-xs sm:text-sm">{member.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Our_Team;