"use client";

import { useState, useEffect } from "react";
import { AiOutlineTeam } from "react-icons/ai";  // Team Icon
import { FaBriefcase, FaLinkedin, FaGithub } from "react-icons/fa"; 
import { FaSquareXTwitter } from "react-icons/fa6";
import AboutUs1 from '../AboutUs/Aboutus1';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  department?: "frontend" | "backend" | "ui";
  linkedin?: string;
  twitter?: string;
  github?: string;
}

interface TeamData {
  founders: TeamMember[];
  developmentTeam: {
    frontend: TeamMember[];
    backend: TeamMember[];
    ui: TeamMember[];
  };
}

type Department = "all" | "frontend" | "backend" | "ui";

export default function AboutUs() {
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [activeDepartment, setActiveDepartment] = useState<Department>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/data/teamData.json')
      .then((response) => response.json())
      .then((data) => {
        setTeamData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching team data:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!teamData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Failed to load team data</p>
      </div>
    );
  }

  const getAllTeamMembers = () => {
    return [
      ...teamData.developmentTeam.frontend,
      ...teamData.developmentTeam.backend,
      ...teamData.developmentTeam.ui
    ];
  };

  const getFilteredMembers = () => {
    if (activeDepartment === "all") {
      return getAllTeamMembers();
    }
    return teamData.developmentTeam[activeDepartment];
  };

  return (
    <>
      <AboutUs1 />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h1>
            <p className="text-xl text-gray-600">Meet the amazing people behind our success</p>
          </div>

          {/* Founders Section */}
          <div className="mb-20">
            <div className="flex items-center justify-center mb-8">
              <FaBriefcase className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-900">Founder & Co-founder</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              {teamData.founders.map((founder) => (
                <div 
                  key={founder.name} 
                  className="w-64 bg-white rounded-xl shadow-lg transform transition-all hover:scale-105"
                >
                  <div className="p-6 text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                      <img 
                        src={founder.image} 
                        alt={founder.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900">{founder.name}</h3>
                    <p className="text-blue-600 mt-1">{founder.role}</p>
                    <div className="mt-4 flex justify-center space-x-4">
  {founder.linkedin && (
    <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
      <FaLinkedin className="text-blue-600 w-5 h-5 hover:text-blue-800" />
    </a>
  )}
  {founder.twitter && (
    <a href={founder.twitter} target="_blank" rel="noopener noreferrer" title="Twitter">
      <FaSquareXTwitter className="text-gray-200 w-5 h-5 text-black" />
    </a>
  )}
  {founder.github && (
    <a href={founder.github} target="_blank" rel="noopener noreferrer" title="GitHub">
      <FaGithub className="text-gray-800 w-5 h-5 hover:text-gray-900" />
    </a>
  )}
</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Connecting Line */}
            <div className="w-px h-16 bg-gray-300 mx-auto"></div>
          </div>

          {/* Team Members Section */}
          <div>
            <div className="flex items-center justify-center mb-8">
              <AiOutlineTeam className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-900">Team Members</h2>
            </div>

            {/* Sliding Filter Buttons */}
            <div className="flex justify-center mb-12">
              <div className="bg-gray-100 p-1 rounded-full flex space-x-1">
                {["all", "frontend", "backend", "ui"].map((dept) => (
                  <button
                    type="button"
                    key={dept}
                    onClick={() => setActiveDepartment(dept as Department)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200
                      ${activeDepartment === dept 
                        ? "bg-white text-blue-600 shadow-md transform scale-105" 
                        : "text-gray-600 hover:text-gray-900"}`}
                  >
                    {dept.charAt(0).toUpperCase() + dept.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Team Members Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
              {getFilteredMembers().map((member) => (
                <div 
                  key={member.name} 
                  className="w-64 bg-white rounded-xl shadow-lg transform transition-all hover:scale-105"
                >
                  <div className="p-6 text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900">{member.name}</h3>
                    <p className="text-blue-600 mt-1">{member.role}</p>

                    {/* Social Media Links */}
                    <div className="mt-4 flex justify-center space-x-4">
  {member.linkedin && (
    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
      <FaLinkedin className="text-blue-600 w-5 h-5 hover:text-blue-800" />
    </a>
  )}
  {member.twitter && (
    <a href={member.twitter} target="_blank" rel="noopener noreferrer">
      <FaSquareXTwitter className=" w-5 h-5 text-gray-800 hover:text-black" />
    </a>
  )}
  {member.github && (
    <a href={member.github} target="_blank" rel="noopener noreferrer">
      <FaGithub className="text-gray-800 w-5 h-5 hover:text-gray-900" />
    </a>
  )}
</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
