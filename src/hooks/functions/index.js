export const trancateWord = (string) => {
  if (string) {
    return string.replace(/(.{20})..+/, "$1…");
  }
};
