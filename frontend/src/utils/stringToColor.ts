export const stringToHexColor = (
  word: string,
  saturation = 0.5,
  lightness = 0.6,
  defaultColor = "#000000",
) => {
  if (!word || word.length < 3) {
    return defaultColor;
  }
  const hue = word.charCodeAt(0) * word.charCodeAt(1) * word.charCodeAt(2);
  const a = saturation * Math.min(lightness, 1 - lightness);

  const calculateColor = (n: number) => {
    const k = (n + hue / 30) % 12;
    const color = lightness - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };

  const red = calculateColor(0);
  const green = calculateColor(4);
  const blue = calculateColor(8);

  return `#${red}${green}${blue}`;
};

export const getRandomLetter = () => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  return alphabet[randomIndex];
};
