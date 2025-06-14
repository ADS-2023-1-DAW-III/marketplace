import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Encontre os melhores produtos do nosso marketplace
          </h1>
          <p className="text-gray-600 mb-6">
            Explore uma ampla variedade de produtos de diversos vendedores. Qualidade e preço justo em um só lugar.
          </p>
          <Button className="text-white">Ver produtos</Button>
        </div>
        <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <img
            src="/assets/hero-image.svg"
            alt="Hero"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
}
