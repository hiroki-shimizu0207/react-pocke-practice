import { useEffect, useState } from "react";
import { getAllPockemon, getPockemon } from "./utils/pockemon";
import Card from "./components/Card/card";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

function App() {
  const inintialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pockemonData, setPockemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState([]);
  const [prevUrl, setPrevUrl] = useState([]);

  const loadPockemon = async (data) => {
    // 全ての値を一つ一つ取り出すのに時間がかかるそれが20個ある
    // 20個の全てのデータを取得し終わるまで
    let _pockemonData = await Promise.all(
      data.map((pockemon) => {
        let pockemonRecord = getPockemon(pockemon.url);
        return pockemonRecord;
      })
    );
    setPockemonData(_pockemonData);
  };

  // 一度のみ呼び出し
  useEffect(() => {
    const fetchPockemonData = async () => {
      // 全てのポケモンデータの取得
      let res = await getAllPockemon(inintialURL);
      // 各ポケモンの詳細なデータ取得
      loadPockemon(res.results);
      // 初めに次のページを取得できるようにしておく
      setNextUrl(res.next);
      // 初めに前のページを取得できるようにしておく
      setPrevUrl(res.previous);
      setLoading(false);
    };
    fetchPockemonData();
  }, []);

  const getPage = async (url) => {
    let data = await getAllPockemon(url);
    await loadPockemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
  };

  // 非同期にして全てを読み込んでから発火させる
  const handleNextPage = async () => {
    setLoading(true);
    getPage(nextUrl);
    // let data = await getAllPockemon(nextUrl);
    // await loadPockemon(data.results);
    // setNextUrl(data.next);
    // setPrevUrl(data.previous);
    setLoading(false);
  };

  const handlePrevPage = async () => {
    if (!prevUrl) return;
    setLoading(true);
    getPage(prevUrl);
    // let data = await getAllPockemon(prevUrl);
    // await loadPockemon(data.results);
    // setNextUrl(data.next);
    // setPrevUrl(data.previous);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <h1>ローディング中</h1>
      ) : (
        <div className="pockemonCardContainer">
          {pockemonData.map((pockemon, i) => {
            return <Card key={i} pockemon={pockemon} />;
          })}
        </div>
      )}
      <div className="btn">
        {!prevUrl ? "" : <button onClick={handlePrevPage}>前へ</button>}
        <button onClick={handleNextPage}>次へ</button>
      </div>
    </>
  );
}

export default App;
