  export const normalize = (d) => {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  };