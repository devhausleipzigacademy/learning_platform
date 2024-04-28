import Navbar from '@/components/layout-navigation/navbar';
import HeartBeat from '@/components/ui/heartBeat';
import { HeartIcon } from 'lucide-react';

export const metadata = {
  title: 'Devhaus Learning Platform',
  description: 'The Devhaus Learning Platform',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
};

export default function HomePage() {
  return (
    <main className=" light:text-dark dark:heropattern-topography-white/50 dark:text-light light:heropattern-topography-black/50 flex h-full w-full flex-col items-center justify-start opacity-10">
      <div className="grid w-full grid-cols-6 gap-4 p-12">
        {Array.from({ length: 10 }).map((_, idx) => {
          return (
            <div
              key={idx}
              className="dark:shadow-secondary light:shadow-black bg-black h-[200px] w-full rounded-sm p-2 shadow-inner"
            >
              <div className="dark:bg-white/30 dark:shadow-secondary light:shadow-black flex h-full w-full -translate-y-1 translate-x-2 flex-col items-center justify-between rounded-md p-2 transition-transform duration-150 ease-in-out hover:translate-x-0 hover:translate-y-0 hover:drop-shadow-lg">
                <h3 className="text-white w-full text-2xl font-bold">
                  Entity {idx}
                </h3>
                <div className="w-full flex-grow"></div>
                <div className="flex w-full justify-between">
                  <div></div>
                  <div>
                    {Math.round(Math.random()) ? (
                      <HeartBeat delay={[0.8, 1.4]} duration={0.6} scale={1.1}>
                        <HeartIcon className="fill-secondary stroke-light strok h-6 w-6" />
                      </HeartBeat>
                    ) : (
                      <HeartIcon className="h-6 w-6" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
