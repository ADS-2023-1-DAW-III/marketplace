export default function Hero() {
  return (
      <section className="py-16 h-screen flex">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="md:text-5xl font-poppins font-bold text-white mb-4">
              Encontre soluções para o dia a dia, divulgue seus serviços e crie uma rede de contatos que vai além do trabalho.
            </h1>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center">
            <img
                src="app/assets/HeroImage.svg"
                alt="Hero"
                className="w-full max-w-md"
            />
          </div>
        </div>
      </section>
  );
}
