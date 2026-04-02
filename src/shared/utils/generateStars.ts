export const generateStars = (count: number = 25, heightMultiplier: number = 1) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const x = Math.random() * 100; // 0–100%
    const y =
      Math.random() * 100 * heightMultiplier;
    const delay = Math.random() * 8; // 0–8 секунд задержки
    const sizeFactor = Math.random() * 1.2 + 0.6; // 0.6–1.8 (разброс размеров)
    const opacityBase = Math.random() * 0.4 + 0.4; // 0.4–0.8 базовая прозрачность

    stars.push({
      id: i,
      x: `${x.toFixed(1)}%`,
      y: `${y.toFixed(1)}%`,
      delay: `${delay.toFixed(1)}s`,
      sizeFactor: sizeFactor.toFixed(2),
      opacityBase: opacityBase.toFixed(2),
    });
  }
  return stars;
};
