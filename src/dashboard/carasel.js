export function Carosel({ slides }) {
  return (
    <div className="relative overflow-scroll snap-x snap-mandatory">
      <div className="h-96 flex flex-wrap flex-col gap-4">
        {slides.map((slide, index) => {
          return (
            <div key={index} className="w-full snap-always snap-center scroll-mr-*">
              <img src={slide} alt="slide" className="w-full h-96 object-cover rounded-lg shadow dark:bg-white" />
            </div>
          );
        })}
      </div>
    </div>
  );
}