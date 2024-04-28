import HeartBeat from '@/components/ui/heartBeat';
import { HeartIcon } from 'lucide-react';

export const metadata = {
  title: 'Devhaus Learning Platform',
  description: 'The Devhaus Learning Platform',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
};

export default function HomePage() {
  return (
    <main className="light:text-dark dark:heropattern-topography-light/10 dark:text-light light:heropattern-topography-dark/10 flex h-full w-full flex-col items-center justify-start">
      <div className="grid w-full grid-cols-6 gap-4 p-8">
        {Array.from({ length: 10 }).map((_, idx) => {
          return (
            <div
              key={idx}
              className="bg-black/70 h-[200px] w-full rounded-2xl p-2 transition-all duration-700 hover:rounded-none"
            >
              <div className="light:text-white dark:text-dark bg-primary/70 dark:shadow-accent2/70 light:shadow-dark flex h-full w-full flex-col items-center justify-between rounded-md p-2 transition-all duration-700 hover:rounded-2xl hover:shadow-md">
                <h3 className="flex w-full items-center justify-center text-2xl font-bold">
                  Entity {idx + 1}
                </h3>
                <div className="w-full p-1">
                  <p className="line-clamp-5 break-all text-xs">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Hic vel expedita quam impedit culpa doloribus quisquam,
                    placeat maiores ea beatae quidem, ab fuga necessitatibus
                    voluptates ipsa earum reprehenderit dolorum itaque.
                  </p>
                </div>
                <div className="flex w-full justify-between">
                  <div></div>
                  <div>
                    {Math.round(Math.random()) ? (
                      <HeartBeat delay={[0.8, 1.4]} duration={0.6} scale={1.1}>
                        <HeartIcon className="fill-accent1 dark:stroke-dark light:stroke-accent3  h-6 w-6" />
                      </HeartBeat>
                    ) : (
                      <HeartIcon className="dark:stroke-dark h-6 w-6" />
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
