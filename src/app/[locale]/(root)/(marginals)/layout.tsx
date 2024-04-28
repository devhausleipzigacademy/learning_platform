import Navbar from '@/components/layout-navigation/navbar';

type MarginalsClientLayoutProps = {
  children: React.ReactNode | React.ReactNode[];
};

export default function MarginalsClientLayout({
  children
}: MarginalsClientLayoutProps) {
  return (
    <>
      <div className="flex w-full flex-grow items-start justify-center">
        <div className="border-primary flex h-screen w-[15%] flex-shrink-0 flex-col items-center justify-center border-r-2">
          <Navbar />
        </div>
        <div className="flex h-screen flex-grow flex-col items-center justify-start">
          {children}
        </div>
      </div>
    </>
  );
}
