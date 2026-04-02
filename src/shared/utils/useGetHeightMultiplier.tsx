import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useGetHeightMultiplier = () => {
  const [heightMultiplier, setHeightMultiplier] = useState(1); // начальное значение 1
  const { pathname } = useLocation();

  useEffect(() => {
    // Функция для расчета множителя
    const calculateMultiplier = () => {
      const multiplier = document.body.clientHeight / window.innerHeight;
      setHeightMultiplier(multiplier || 1);
    };

    // Вызываем сразу
    calculateMultiplier();

    // И на все изменения размеров
    window.addEventListener("resize", calculateMultiplier);

    // Дополнительно на полную загрузку
    window.addEventListener("load", calculateMultiplier);

    return () => {
      window.removeEventListener("resize", calculateMultiplier);
      window.removeEventListener("load", calculateMultiplier);
    };
  }, [pathname]);

  return heightMultiplier;
};
