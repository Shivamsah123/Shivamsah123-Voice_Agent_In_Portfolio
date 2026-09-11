import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Skills from '../components/Skills/Skills';
import Projects from '../components/Projects/Projects';
import Resume from '../components/Resume/Resume';
import Contact from '../components/Contact/Contact';

const Home = () => {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Resume />
      <Contact />
    </main>
  );
};

export default Home;
