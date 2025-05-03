import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="relative w-full pt-48 lg:pt-0 lg:h-104 bg-cover bg-no-repeat bg-position-[center_20%] bg-[url('/home-cover-1.png')]">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

        {/* Text */}
        <div className="absolute lg:top-56 lg:left-4 bg-white px-8 py-4 z-20 rounded-tl-3xl rounded-br-3xl flex flex-col gap-4 lg:w-md">
          <h1 className="text-xl md:text-3xl font-bold text-center">
            Helping you learn English, step-by-step
          </h1>
          <hr className="border-4 -mx-8 border-primary-500"/>
          <p>
            Want to improve your English? Feel like the other options just don't fit your style?
            Try out <strong className="text-primary-500 font-bold">InggrisLand</strong>,
            a free English-learning app designed to help out people just like you
            ! <Link to={"/explore"} className="text-primary-500 hover:underline focus:underline">Click here to try!</Link>
          </p>
        </div>
      </div>

    </>
  )
}

export default Home;