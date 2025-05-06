import { useEffect, useState } from 'react';
import axios from 'axios';

interface Group {
  id: number;
  name: string;
  description: string;
  level: number;
  duration: string;
  imageUrl: string;
}

const ActivityCard = ({ group }: { group: Group }) => (
  <a className="relative border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm group transition-shadow hover:shadow-md cursor-pointer" href={`/learn/${group.id}`}>
    <div className="relative overflow-hidden">
      <img
        src={group.imageUrl}
        alt={group.name}
        className="w-full h-auto block transform scale-100 group-hover:scale-110 transition-transform duration-350 ease-in-out"
      />
    </div>
    <div className="bg-teal-500 text-white p-4 flex items-center justify-between">
      <div>
        <div className="text-sm">{group.level === 1 ? 'Basic' : 'Independent'}</div>
        <div className="text-lg font-semibold">{group.name}</div>
      </div>
      <div className="text-white text-xl">&gt;</div>
    </div>
    <div className="p-4 text-gray-700 text-sm border-b border-gray-200">
      {group.description}
    </div>
    <div className="p-4 flex items-center justify-between text-gray-500 text-sm">
      <span>{group.duration}</span>
    </div>
  </a>
);

const Explore = () => {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/groups');
        setGroups(res.data);
      } catch (err) {
        console.error('Failed to fetch groups', err);
      }
    };

    fetchGroups();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold bg-white p-5">Explore English Groups</h1>
      <div className="font-sans p-5 bg-primary-200">
        <h2 className="text-xl font-semibold mb-4">We found {groups.length} activities for you</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {groups.map((group) => (
            <ActivityCard key={group.id} group={group} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Explore;
