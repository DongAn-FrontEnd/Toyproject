let options = {
  root: document.body,
  rootMargin: "0px, 0px, 100px, 0px",
};

let images;

const callback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      observer.unobserve("entry.target");
    }
  });
};

let observer = new IntersectionObserver(options, callback);
