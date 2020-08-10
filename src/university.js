export const converter = (university) => {
  switch (university) {
    case "중앙대학교":
      return [126.95523625165191, 37.50481979676819];
    case "한국항공대학교":
      return [126.86504040745824, 37.59957215989527];
    case "이화여자대학교":
      return [126.94840921958536, 37.564679500022265];
    case "연세대학교":
      return [126.9381766143352, 37.56525122263238];
    default:
      return [0, 0];
  }
};
