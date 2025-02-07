import { observer } from "mobx-react-lite";
import React, { useContext, useRef, useState, useEffect } from "react";
import { Context } from "../index";
import { Card, Col, Button } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Иконки стрелок

const TypeBar = observer(() => {
    const { product } = useContext(Context);
    const scrollContainerRef = useRef(null);

    // Состояние для управления стрелками
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    // Функция прокрутки (используется для кнопок)
    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 200; // Количество пикселей для прокрутки
            scrollContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    // Проверка положения прокрутки (скрытие стрелок)
    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
        }
    };

    // Проверяем прокрутку сразу при загрузке
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            checkScroll(); // Проверяем, нужны ли стрелки
            scrollContainer.addEventListener("scroll", checkScroll);
        }
        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener("scroll", checkScroll);
            }
        };
    }, []);

    // Обработчик скролла колесиком мыши
    const handleWheelScroll = (event) => {
        event.preventDefault(); // Блокируем прокрутку всей страницы
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: event.deltaY < 0 ? -100 : 100, // Двигаем влево или вправо
                behavior: "smooth",
            });
        }
    };

    return (
        <Col
            className="position-relative d-flex align-items-center"
            style={{ overflow: "hidden" }}
        >
            {/* Левая кнопка (отображается, если можно листать влево) */}
            {showLeftArrow && (
                <Button
                    variant="light"
                    className="position-absolute start-0 z-1"
                    style={{ borderRadius: "50%", boxShadow: "0 0 10px rgba(0,0,0,0.1)", width: 40, height: 40 }}
                    onClick={() => scroll("left")}
                >
                    <FaChevronLeft color="#800080" />
                </Button>
            )}

            {/* Контейнер с типами товаров */}
            <div
                ref={scrollContainerRef}
                className="d-flex gap-2 flex-nowrap"
                style={{
                    overflowX: "auto",
                    scrollBehavior: "smooth",
                    whiteSpace: "nowrap",
                    scrollbarWidth: "none"
                }}
                onWheel={handleWheelScroll} // Прокрутка колесиком мыши
                onMouseEnter={() => document.body.style.overflow = "hidden"} // Отключаем прокрутку страницы
                onMouseLeave={() => document.body.style.overflow = "auto"} // Включаем обратно
            >
                {product.types.map(type => (
                    <Card
                        key={type.id}
                        className="p-2 flex-shrink-0"
                        style={{
                            cursor: "pointer",
                            width: 120,
                            height: 50,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            border: `1px solid ${type.id === product.selectedType.id ? "#800080" : "#888"}`,
                            fontSize: "16px",
                            fontWeight: "bold",
                            transition: "color 0.2s ease-in-out, border-color 0.2s ease-in-out",
                        }}
                        onClick={() => product.setSelectedType(type)}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#800080";
                            e.currentTarget.style.borderColor = "#800080";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = "black";
                            e.currentTarget.style.borderColor = "#888";
                        }}
                    >
                        {type.name}
                    </Card>
                ))}
            </div>

            {/* Правая кнопка (отображается, если можно листать вправо) */}
            {showRightArrow && (
                <Button
                    variant="light"
                    className="position-absolute end-0 z-1"
                    style={{ borderRadius: "50%", boxShadow: "0 0 10px rgba(0,0,0,0.1)", width: 40, height: 40 }}
                    onClick={() => scroll("right")}
                >
                    <FaChevronRight color="#800080" />
                </Button>
            )}
        </Col>
    );
});

export default TypeBar;
