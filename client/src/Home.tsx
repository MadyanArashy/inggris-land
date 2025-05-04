import { Link } from "react-router-dom";
import INFO from "../data/info.ts"
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full pt-48 lg:pt-0 md:h-110 bg-cover bg-no-repeat bg-position-[center_30%] bg-[url('/home-cover-1.png')] mb-60 md:mb-24">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        {/* Text */}
        <div className="absolute md:top-56 md:left-4 bg-white px-8 py-4 z-20 md:rounded-tl-3xl md:rounded-br-3xl flex flex-col gap-4 md:w-md shadow-lg">
          <h1 className="text-2xl md:text-4xl font-bold text-center text-primary-900">
            Helping you learn English, step-by-step
          </h1>
          <hr className="border-4 border-primary-500 mx-auto w-full" />
          <p className="text-base text-gray-700">
            Want to improve your English? Feel like the other options just don't fit your style?
            Try out{" "}
            <strong className="text-primary-500 font-bold">InggrisLand</strong>,
            a free English-learning app designed to help out people just like you!{" "}
            <Link to="/explore" className="text-primary-500 hover:underline">
              Click here to try!
            </Link>
          </p>
        </div>
      </div>

      {/* Reusable Section Component */}
      {INFO.home.map((section, index) => (
        <div key={index} className="relative w-full py-12">
          {/* Background Layer */}
          <div className="absolute inset-0 bg-primary-500 opacity-50"></div>

          {/* Content Container */}
          <div
            className={`relative z-10 flex flex-col-reverse w-auto md:mx-16 sm:mx-4 lg:mx-auto lg:flex-row ${
              index % 2 === 0 ? "lg:flex-row-reverse" : ""
            } items-center justify-center bg-white rounded-tl-4xl rounded-br-4xl shadow-xl max-w-5xl mx-auto overflow-hidden`}
          >
            {/* Image Section */}
            <div className="w-full lg:w-1/2 h-80 lg:h-[400px]">
              <img
                src={section.image}
                alt={`${section.title} section`}
                className="object-cover w-full h-full"
              />
            </div>
          
            {/* Text Content */}
            <div className="w-full lg:w-1/2 p-6 lg:p-10 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-primary-900 mb-3">{section.title}</h2>
              <p className="text-base mb-4">{section.content[0]}</p>
              <ul className="list-disc list-inside text-base mb-5 space-y-2">
                {section.content.slice(1).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <button
              onClick={() => {navigate("/explore#")}}
              className="bg-primary-500 text-white rounded-full px-6 py-2 text-base font-semibold transition-transform not-motion-reduce:transform hover:scale-105 hover:bg-primary-400 cursor-pointer">
                Start learning
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;



// INI HOME YANG LAMA, KALAU MAU DIGANTI, PAKE AJA YG INI --------------------------------------



// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     <>
//       <div className="relative w-full pt-48 lg:pt-0 lg:h-104 bg-cover bg-no-repeat bg-position-[center_20%] bg-[url('/home-cover-1.png')]">
//         {/* Overlay */}
//         <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

//         {/* Text */}
//         <div className="absolute lg:top-56 lg:left-4 bg-white px-8 py-4 z-20 rounded-tl-3xl rounded-br-3xl flex flex-col gap-4 lg:w-md">
//           <h1 className="text-xl md:text-3xl font-bold text-center">
//             Helping you learn English, step-by-step
//           </h1>
//           <hr className="border-4 -mx-8 border-primary-500"/>
//           <p>
//             Want to improve your English? Feel like the other options just don't fit your style?
//             Try out <strong className="text-primary-500 font-bold">InggrisLand</strong>,
//             a free English-learning app designed to help out people just like you
//             ! <Link to={"/explore"} className="text-primary-500 hover:underline focus:underline">Click here to try!</Link>
//           </p>
//         </div>
//       </div>
//       {/* Skills */}
//       <p className="text-2xl mt-15 max-w-2xl mx-auto my-6 text-center text-primary-900">Everything you find here has been specially created by the British Council, the world's English teaching experts.</p>

//       {/* Skills Section */}
//       <div className="relative w-full py-10">
//         <div className="absolute inset-0 bg-primary-500 opacity-50 w-full h-full"></div>
//         <div className="relative z-10 flex flex-col items-center">
//           <p className="text-2xl font-bold text-center mb-6 text-white drop-shadow-sm px-2">We provide you with the right tools to help you interact confidently in the real world.</p>
//           <div className="flex flex-col lg:flex-row items-center justify-center bg-white rounded-3xl shadow-xl max-w-5xl mx-auto overflow-hidden">
//             {/* Gambar */}
//             <div className="w-full lg:w-1/2 h-80 lg:h-[400px] relative">
//               <img
//                 src="/home-skills.png"
//                 alt="People learning skills"
//                 className="object-cover w-full h-full"
//               />
//             </div>
//             {/* Konten */}
//             <div className="w-full lg:w-1/2 p-6 lg:p-10 flex flex-col justify-center">
//               <h2 className="text-3xl font-bold text-primary-900 mb-3">Skills</h2>
//               <p className="text-base mb-3">Practise your listening, reading, writing and speaking and learn useful language to use at work or to communicate effectively with friends.</p>
//               <ul className="list-disc list-inside text-base mb-5 space-y-1">
//                 <li>Audio and video to practise your listening and speaking skills.</li>
//                 <li>Model texts for all types of writing tasks.</li>
//                 <li>Work on your reading skills to read more quickly and understand more.</li>
//               </ul>
//               <button className="bg-primary-500 text-white rounded-full px-8 py-2 text-base font-semibold w-fit hover:bg-primary-400 transition hover:cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-primary-500">Start learning</button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Grammar Section */}
//       <div className="relative w-full py-10">
//         <div className="flex flex-col-reverse lg:flex-row items-center justify-center bg-white rounded-3xl shadow-xl max-w-5xl mx-auto overflow-hidden">
//           {/* Konten */}
//           <div className="w-full lg:w-1/2 p-6 lg:p-10 flex flex-col justify-center">
//             <h2 className="text-4xl font-bold text-primary-900 mb-3">Grammar</h2>
//             <p className="text-lg mb-3">Revise and practise your grammar to improve your language level and increase your confidence.</p>
//             <ul className="list-disc list-inside text-lg mb-5 space-y-1">
//               <li>Clear and simple grammar explanations to help you revise and practise different grammar points.</li>
//               <li>Online exercises to help you check your understanding of the grammar points.</li>
//               <li>Use the grammar reference for further practice and more detailed explanations.</li>
//             </ul>
//             <button className="bg-primary-500 text-white rounded-full px-8 py-2 text-base font-semibold w-fit hover:bg-primary-400 transition hover:cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-primary-500">Start learning</button>
//           </div>
//           {/* Gambar */}
//           <div className="w-full lg:w-1/2 h-80 lg:h-[400px] relative">
//             <img
//               src="/home-grammar.png"
//               alt="Grammar section"
//               className="object-cover w-full h-full"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Vocabulary Section */}
//       <div className="relative w-full py-10">
//         <div className="flex flex-col lg:flex-row items-center justify-center bg-white rounded-3xl shadow-xl max-w-5xl mx-auto overflow-hidden">
//           {/* Gambar */}
//           <div className="w-full lg:w-1/2 h-80 lg:h-[400px] relative">
//             <img
//               src="/home-vocabulary.png"
//               alt="Vocabulary section"
//               className="object-cover w-full h-full"
//             />
//           </div>
//           {/* Konten */}
//           <div className="w-full lg:w-1/2 p-6 lg:p-10 flex flex-col justify-center">
//             <h2 className="text-4xl font-bold text-primary-900 mb-3">Vocabulary</h2>
//             <p className="text-lg mb-3">Learn new words and improve your language level to be able to communicate in English effectively.</p>
//             <ul className="list-disc list-inside text-lg mb-5 space-y-1">
//               <li>Online exercises to help you learn the meaning, pronunciation and spelling of new words.</li>
//               <li>Learn new words connected to a wide range of different topics.</li>
//               <li>Play our word games and have fun as you improve your vocabulary.</li>
//             </ul>
//             <button className="bg-primary-500 text-white rounded-full px-8 py-2 text-base font-semibold w-fit hover:bg-primary-400 transition hover:cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-primary-500">Start learning</button>
//           </div>
//         </div>
//       </div>

//     </>
//   )
// }

// export default Home;