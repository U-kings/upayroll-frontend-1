export const getMonthListMethod = (format) => {
const getMonthList = (locale = "en", notation = {format}) =>
  Array.from(Array(12).keys(), (key) =>
  Intl.DateTimeFormat(locale, {
    month:
    {
      s: "short",
      n: "numeric",
    }[notation[0]] || format,
  }).format(new Date(0, key))
  );
  return getMonthList();
}

export const currentmonthMethod = (format) =>{
    return new Date().toLocaleString("en-US", { month: format });
}

export const currentyearMethod = () => {
  return new Date().getFullYear();
} 
