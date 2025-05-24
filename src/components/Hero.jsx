// src/components/Hero.jsx
import React from "react"
import { styles } from "../styles"

const Hero = () => {
  return (
    <section className="w-full min-h-screen mx-auto">
      {/* Centered hero content in normal flow */}
      <div
        className={`
          ${styles.paddingX}
          pt-32 pb-16
          max-w-7xl mx-auto
          flex flex-row items-start gap-5
        `}
      >
        {/* Violet dot + line */}
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        {/* Your intro text */}
        <div>
          <h1 className={`${styles.heroHeadText} text-white mt-20`}>
            Hi, I'm <span className="text-[#915EFF]">Vedanth</span>
          </h1>
          <p className={`${styles.heroSubText} text-white-100 mt-15`}>
            I'm a sophomore at{" "}
            <a
              href="https://www.cs.cmu.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#915EFF] underline"
            >
              Carnegie Mellon
            </a>
            ,<br className="sm:block hidden" />
            interested in{" "}
            <span className="text-[#915EFF]">education</span>,{" "}
            <span className="text-[#915EFF]">sustainability</span>, and{" "}
            <span className="text-[#915EFF]">equity</span> through computing.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
