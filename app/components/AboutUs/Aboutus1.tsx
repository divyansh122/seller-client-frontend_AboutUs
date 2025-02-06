'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import CountUp from "react-countup";
import { useEffect, useState } from "react";

export default function AboutUs() {
  const [counterKey, setCounterKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounterKey((prevKey) => prevKey + 1); // Change the key to restart the count
    }, 5000); // Reset the counter every 5 seconds (you can adjust the time here)

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);
  return (
    <div className="min-h-screen bg-[#F3EBEB]  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-primary lg:text-5xl custom-para1">
            Empower. Shop. Sustain.
            </h1>
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground text-justify custom-para1">
              Empowering local vendors, enhancing shopping experiences, Empowering local vendors, enhancing shopping experiences, and promoting sustainable fashion create a more ethical and vibrant marketplace. Supporting small businesses brings unique products to consumers, while seamless shopping experiences make fashion more accessible. Promoting sustainability encourages mindful choices, reducing environmental impact and fostering a responsible shopping culture.
              </p>
              <div className="flex items-center pt-4">
              <button type="button" className="inline-flex items-center gap-2  text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 border-4 border-black transition-opacity">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/homeimage.png"
              alt="Team collaboration"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
      {[
        { number: 1000, suffix: "+", label: "Vendors Listed" },
        { number: 124222, suffix: "+", label: "Orders Daily" },
        { number: 50, suffix: "+", label: "Big Brands" },
        { number: 99, suffix: "%", label: "User Satisfied" },
      ].map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">
            <CountUp
              key={counterKey} // Reset the counter on key change
              start={0}
              end={stat.number}
              duration={2.5}
              separator=","
              suffix={stat.suffix}
            />
          </div>
          <div className="text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </div>
      </div>
    </div>
  );
}