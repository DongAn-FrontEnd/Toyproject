const debounce = (callback, sec) => {
  let timeoutId;

  return (...args) => {
    timeoutId && clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback.apply(null, args);
    }, sec);
  };
};

export default debounce;
