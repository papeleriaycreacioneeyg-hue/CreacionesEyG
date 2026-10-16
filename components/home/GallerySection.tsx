import Image from "next/image";

const galleryItems = [
  { id: 1, title: "Detalles personalizados", src: "/images/gallery/trabajo-1.jpg" },
  { id: 2, title: "Cajas sorpresa de taller", src: "/images/gallery/trabajo-2.jpg" },
  { id: 3, title: "Regalos para momentos únicos", src: "/images/gallery/trabajo-3.jpg" },
  { id: 4, title: "Confección artesanal", src: "/images/gallery/trabajo-4.jpg" },
  { id: 5, title: "Cotillón y recuerdos", src: "/images/gallery/trabajo-5.jpg" },
  { id: 6, title: "Empaque y presentación especial", src: "/images/gallery/trabajo-6.jpg" },
];

export function GallerySection() {
  return (
    <section className="w-full bg-[#f8f3fc]/60 py-14 sm:py-20 border-y border-purple-100/60">
      <div className="container mx-auto px-4 sm:px-6 space-y-8">
        {/* Header with Golden Stars */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight text-[#4a154b] flex items-center justify-center gap-2">
            <span className="text-[#d4a359] text-lg sm:text-xl">✦</span>
            <span>Trabajos realizados</span>
            <span className="text-[#d4a359] text-lg sm:text-xl">✦</span>
          </h2>
        </div>

        {/* 6-Photo Horizontal Showcase Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden border border-rose-100/80 shadow-2xs bg-white transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
              />
              {/* Subtle hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2.5">
                <span className="text-[10px] font-semibold text-white truncate drop-shadow-xs">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
