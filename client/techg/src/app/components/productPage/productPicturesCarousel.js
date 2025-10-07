"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

const ProductPicturesCarousel = ({pictures}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  pictures = pictures.flatMap((pic, index) => {return{id: index, name: pic}})


  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* embla viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
            {
            pictures.map(pic => {
                return (
                  <div className="min-w-full h-full flex items-center justify-center"
                      key={pic.id}>
                      <img src={`${process.env.NEXT_PUBLIC_STATIC_BASE_URL}/${pic.name}`}></img>
                  </div>
                )
            })
            }
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white px-3 py-1 rounded shadow cursor-pointer hover:text-xl transition-all"
      >
        {'<'}
      </button>
      <button
        onClick={scrollNext}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white px-3 py-1 rounded shadow cursor-pointer hover:text-xl transition-all"
      >
        {'>'}
      </button>
    </div>
  );
}

export default ProductPicturesCarousel