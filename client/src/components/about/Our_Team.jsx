import React from "react";
import Texture from "../../assets/images/green-effect2.png";
import { useTranslation } from 'react-i18next';
import Teferi from "../../assets/images/teferi.png";

const Our_Team = () => {
  const { t } = useTranslation();

  const generalManager = {
    name: "Dr. Tefera Mekonen (PhD)",
    position: "Animal Nutrition Specialist & General Manager",
    image: Teferi,
    description: "Leading the organization with extensive expertise in animal nutrition and livestock development."
  };

  const teamStructure = [
    { title: "Animal Production Specialist", qualifications: "PhD" },
    { title: "Animal Nutrition Specialists", qualifications: "PhD and M.Sc." },
    { title: "Veterinarians", qualifications: "D.V.M./M.Sc/PhD (Lead Scientist)" },
    { title: "Artificial Insemination Specialists", qualifications: "Specialized Training" },
    { title: "Accountant", qualifications: "Financial Management" },
    { title: "IT Specialist", qualifications: "Technology Support" },
    { title: "Supporting Staff", qualifications: "Various Roles" },
  ];

  return (
    <div className="md:p-10 flex flex-col items-center justify-center">
      <h2 className="font-bold text-4xl text-center my-6">Our Team</h2>
      
      {/* General Manager Section */}
      <div className="w-full max-w-4xl mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8 bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl">
          <div className="flex-shrink-0">
            <img
              src={generalManager.image}
              alt={generalManager.name}
              className="w-48 h-48 rounded-full shadow-lg object-cover border-4 border-green-600"
            />
          </div>
          <div className="flex-grow text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{generalManager.name}</h3>
            <p className="text-lg font-semibold text-green-600 mb-3">{generalManager.position}</p>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              {generalManager.description}
            </p>
          </div>
        </div>
      </div>

      {/* Team Description */}
      <div className="w-full max-w-4xl mb-12">
        <div className="space-y-5 text-center md:text-left">
          <p className="text-gray-700 leading-relaxed">
            Hulegeb is led by a highly qualified multidisciplinary team with strong academic backgrounds and extensive experience in livestock research, development, and technology dissemination. Our professionals possess practical expertise in promoting, demonstrating, and scaling out improved livestock technologies to farmers, development organizations, and other stakeholders.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The team provides professional consultancy and advisory services to private investors and livestock producers, particularly in dairy, sheep, and goat production. Combining scientific knowledge with practical field experience, our multidisciplinary team delivers integrated solutions in animal nutrition, production, health, breeding, artificial insemination, business planning, and technology adoption.
          </p>
        </div>
      </div>

      {/* Team Structure */}
      <div className="w-full">
        <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Our Multidisciplinary Team</h3>
        <div className="relative overflow-hidden rounded-2xl bg-white/80 w-full">
          <img
            src={Texture}
            alt="texture"
            className="absolute inset-0 w-full h-full object-cover opacity-80 z-0"
          />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 p-8 md:p-10">
            {teamStructure.map((member, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border-l-4 border-green-600"
              >
                <h4 className="text-lg font-bold text-gray-800 mb-2">{member.title}</h4>
                <p className="text-sm text-green-600 font-semibold">{member.qualifications}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Our_Team;