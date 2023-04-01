/***
 * The banner shown first when visiting the homepage.
 * Both on Desktop and Phones this Components takes up 100vw with no margin or max-width set
 */
export default function Banner() {
  return (
    <section className="h-screen overflow-y-hidden grid place-items-center shadow-md relative">
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src="/banner.JPG"
        alt="Ceramics for your home"
      />
      <div className="absolute inset-0 w-full h-full grid place-items-center">
        <h1 className="z-[2] text-custom-white font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl grid place-items-center">
          Ceramics <br className="lg:hidden" />
          for your <br className="lg:hidden" />
          home.
        </h1>
      </div>
    </section>
  );
}
