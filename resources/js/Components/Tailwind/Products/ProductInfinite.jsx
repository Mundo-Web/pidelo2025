import { ChevronLeft, ChevronRight, Tag } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import CardHoverBtn from "./Components/CardHoverBtn";
import { adjustTextColor } from "../../../Functions/adjustTextColor";

const ProductInfinite = ({ items, data, setCart, cart }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slidesPerView, setSlidesPerView] = useState(6); // Default en desktop

    // Detectar el tamaño de la pantalla para ajustar slidesPerView
    useEffect(() => {
        const updateSlidesPerView = () => {
            const width = window.innerWidth;
            if (width < 640) setSlidesPerView(6); // Móvil
            else if (width < 1024) setSlidesPerView(3); // Tablet
            else setSlidesPerView(5); // Desktop
        };
        updateSlidesPerView();
        window.addEventListener("resize", updateSlidesPerView);
        return () => window.removeEventListener("resize", updateSlidesPerView);
    }, []);

    // Calcular el máximo número de desplazamientos permitidos
    const maxSlide = useMemo(() => {
        return Math.max(0, Math.ceil(items.length / slidesPerView) - 1);
    }, [items.length, slidesPerView]);

    // Función para avanzar al siguiente slide
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev < maxSlide ? prev + 1 : prev));
    };

    // Función para retroceder al slide anterior
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const prevSlideRef = useRef(null);
    const nextSlideRef = useRef(null);
    useEffect(() => {
        adjustTextColor(prevSlideRef.current); // Aplicar a cada botón en el slider
        adjustTextColor(nextSlideRef.current); // Aplicar a cada botón en el slider
    }, []);

    return (
        <section className="py-12 bg-[#F7F9FB]">
            <div className=" mx-auto px-primary 2xl:px-0 2xl:max-w-7xl h-[500px] max-h-[500px]">
                {/* Header */}
                <div className="md:flex justify-between items-center mb-8 pb-4 border-b customborder-neutral-light">
                    <h2 className="text-[28px] md:text-4xl font-bold  font-font-secondary mb-4 md:mb-0">
                        {data?.title}
                    </h2>
                    <a
                        href={data?.link_catalog}
                        className="bg-primary transition-all duration-300 text-white border-none flex justify-center flex-row items-center gap-3   px-10  py-4 text-base rounded-xl tracking-wide font-bold cursor-pointer hover:opacity-90"
                    >
                        Ver todos
                        <Tag width={"1rem"} className="rotate-90" />
                    </a>
                </div>

                {/* Carousel */}
                <div className="relative">
                    {/* Previous button */}
                    <div className="absolute h-full hidden md:flex items-center z-10  -left-2  ">
                        <button
                            onClick={prevSlide}
                            ref={prevSlideRef}
                            disabled={currentSlide === 0}
                            className=" w-8 h-8 flex items-center justify-center bg-secondary rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Productos anteriores"
                        >
                            <ChevronLeft width={"1rem"} />
                        </button>
                    </div>

                    {/* Products container */}
                    <div className="hidden md:block overflow-hidden py-4">
                        <div
                            className="flex  items-center transition-all duration-300   ease-in-out "
                            style={{
                                transform: `translateX(-${
                                    currentSlide * (100 / slidesPerView)
                                }%)`,
                            }}
                        >
                            {items.map((product, index) => (
                                <CardHoverBtn
                                    key={index}
                                    product={product}
                                    setCart={setCart}
                                    cart={cart}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="overflow-hidden py-4 md:hidden">
                        <div
                            className="flex items-center gap-y-4 transition-all duration-300 ease-in-out flex-wrap flex-shrink"
                            style={{
                                transform: `translateX(-${
                                    currentSlide * (100 / slidesPerView)
                                }%)`,
                            }}
                        >
                            {items.map((product, index) => (
                                <CardHoverBtn
                                    key={index}
                                    product={product}
                                    setCart={setCart}
                                    cart={cart}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Next button */}
                    <div className="absolute h-full bottom-0 -right-2  z-10 hidden md:flex items-center">
                        <button
                            onClick={nextSlide}
                            ref={nextSlideRef}
                            disabled={currentSlide >= maxSlide}
                            className=" w-8 h-8 flex items-center justify-center bg-secondary rounded-lg disabled:opacity-50 disabled:cursor-not-allowed "
                            aria-label="Siguientes productos"
                        >
                            <ChevronRight width={"1rem"} />
                        </button>
                    </div>
                </div>
                {/* Navigation buttons for mobile */}
                <div className="flex justify-end gap-6 mt-4 md:hidden">
                    <button
                        onClick={prevSlide}
                        ref={prevSlideRef}
                        disabled={currentSlide === 0}
                        className="w-8 h-8 flex items-center justify-center bg-secondary rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Productos anteriores"
                    >
                        <ChevronLeft width={"1rem"} />
                    </button>
                    <button
                        onClick={nextSlide}
                        ref={nextSlideRef}
                        disabled={currentSlide >= maxSlide}
                        className="w-8 h-8 flex items-center justify-center bg-secondary rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Siguientes productos"
                    >
                        <ChevronRight width={"1rem"} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProductInfinite;
