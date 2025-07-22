'use client';

import React from 'react';
import Image from 'next/image';

const ProjectImage = ({ src, alt }) => (
  <div className="group relative overflow-hidden rounded-2xl shadow-lg h-full w-full">
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className="object-contain object-center w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
    />
  </div>
);

const OurWorksSection = React.forwardRef(function OurWorksSection(props, ref) {
  const projects = [
    {
      src: '/FINALE112.png',
      alt: 'Project 1 - A modern and sleek web application interface',
      className: 'md:col-span-2 md:row-span-2',
    },
    {
      src: '/Gu9CKNPbQAAUiQn.jpeg',
      alt: 'Project 2 - A vibrant and engaging mobile app design',
      className: 'md:col-span-1 md:row-span-1',
    },
    {
      src: '/GvB80rDaAAUnUJA.jpeg',
      alt: 'Project 3 - A professional and clean e-commerce website layout',
      className: 'md:col-span-1 md:row-span-1',
    },
  ];

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white">Our Creative Work</h2>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">We transform ideas into stunning digital experiences. Here’s a glimpse of our craft.</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:auto-rows-[35vh]">
          {projects.map((project, index) => (
            <div key={index} className={project.className}>
              <ProjectImage src={project.src} alt={project.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

OurWorksSection.displayName = 'OurWorksSection';

export default OurWorksSection;
