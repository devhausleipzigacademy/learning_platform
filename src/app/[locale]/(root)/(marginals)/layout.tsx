import Navbar from "@/components/layout-navigation/navbar";

type MarginalsClientLayoutProps = {
  children: React.ReactNode | React.ReactNode[];
};

export default function MarginalsClientLayout({
  children,
}: MarginalsClientLayoutProps) {
  return (
    <>
      <div className="flex w-full flex-grow items-start justify-center">
        <div className="flex h-screen w-[15%] flex-col items-center justify-center ">
          <Navbar />
        </div>
        <div className="flex h-screen flex-grow flex-col items-center justify-start">
          {children}
        </div>
      </div>
    </>
  );
}
