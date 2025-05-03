import React from 'react';
import INFO from "../data/info.ts";

const ActivityCard: React.FC<typeof INFO.Explore[number]> = ({
  status,
  level,
  title,
  description,
  proficiency,
  duration,
  imageUrl,
}) => (
  <div className="relative border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm group transition-shadow hover:shadow-md hover:cursor-pointer">
    <div className="relative overflow-hidden">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-auto block transform scale-100 group-hover:scale-110 transition-transform duration-350 ease-in-out"
      />
      {status && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-md z-10">
          {status}
        </div>
      )}
    </div>
    <div className="bg-teal-500 text-white p-4 flex items-center justify-between">
      <div>
        <div className="text-sm">{level}</div>
        <div className="text-lg font-semibold">{title}</div>
      </div>
      <div className="text-white text-xl">&gt;</div>
    </div>
    <div className="p-4 text-gray-700 text-sm border-b border-gray-200">
      {description}
    </div>
    <div className="p-4 flex items-center justify-between text-gray-500 text-sm">
      {proficiency && <span>{proficiency}</span>}
      {duration && <span>{duration}</span>}
    </div>
  </div>
);

const Explore: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold bg-white p-5">Learning English</h1>
      <div className="font-sans p-5 bg-primary-200">
        <h2 className="text-xl font-semibold mb-4">We found {INFO.Explore.length} activities for you</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {INFO.Explore.map((activity, index) => (
            <ActivityCard key={index} {...activity} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;