import Bottom from "../components/Bottom";
import Header from "../components/Header";
import ProductsList from "../components/ProductsList";

export default function Home() {
  return (
    <div className="flex text-shops-text-dark font min-h-screen items-center justify-center bg-shops-base font-sans">
      <Header />
      <div className="w-full h-screen overflow-y-auto pb-10 pt-40 flex flex-col items-center gap-3 ">
        <ProductsList />
      </div>
      <Bottom />
    </div>
  );
}
