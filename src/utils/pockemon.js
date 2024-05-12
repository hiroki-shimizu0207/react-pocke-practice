export const getAllPockemon = (url) => {
  // resolve・・成功
  // reject・・失敗
  // json化してdataを取得する
  return new Promise((resolve, reject) => {
    fetch(url).then((res) => res.json().then((data) => resolve(data)));
  });
};

export const getPockemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url).then((res) =>
      res.json().then((data) => {
        resolve(data);
      })
    );
  });
};
