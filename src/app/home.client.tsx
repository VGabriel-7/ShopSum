import Bottom from "../components/Bottom";
import Header from "../components/Header";
import ProductsList from "../components/ProductsList";

export default function Home() {
  return (
    <div className="flex text-shops-text-dark font min-h-screen items-center justify-center bg-shops-base font-sans">
      <Header />
      <ProductsList />
      <Bottom />
    </div>
  );
}
