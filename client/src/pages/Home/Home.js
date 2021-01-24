import React from "react";
import Signup from "../Signup/Signup";

function Home() {
  return (
    <div className='container'>
      <div className='homepage flex justify-evenly'>
        <header className='homepage-header'>
          <h1 className='primary-color xl'>
            MSN<span className='h1-span'>work.</span>
          </h1>
          <p className='heading-secondary secondary-heading secondary-color md'>
            MERN stack social network application
          </p>
        </header>
        <section>
          <div className='card flex justify-center'>
            <Signup />
          </div>
        </section>
      </div>
    </div>
  );
}
export default Home;
