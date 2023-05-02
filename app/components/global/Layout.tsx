import Header from '~/components/global/Header';
import Footer from '~/components/global/Footer';
import {motion, MotionConfig, useMotionValueEvent, useScroll, useTransform} from "framer-motion"
import { useLocation } from 'react-use';

export default function Layout({children}: {children: React.ReactNode}) {
  const loc = useLocation();
  return (
    <MotionConfig reducedMotion='user'>
      <motion.div
        className="flex flex-col min-h-screen"
        initial={{
          opacity:0
        }}
        animate={{
          opacity:1
        }}
        key={loc.pathname}
      >
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>

        <Header />
        <main role="main" id="mainContent" className="flex-grow ">
          {children}
        </main>
        <Footer />
      </motion.div>
    </MotionConfig>
  );
}
