export const objIntoArray = (obj) => {
    let arr = []
    for (let key in obj){
      arr.push(obj[key]);
    }
    return arr;
}
export const defineScrollValue = (scroll) => {
  if (!scroll.value && !scroll.toggle) {
    return {value: true, toggle: 1};
  }
  else if (scroll.toggle === 1) {
    return {value: true, toggle: 2};
  }
  else if (scroll.toggle === 2) {
    return {value: true, toggle: 1};
  }
}
