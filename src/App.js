import React, {useEffect, useState} from "react";
import tmdb from './tmdb';
import Movierow from "./components/Movierow";
import './App.css'
import FeaturedMovie from "./components/FeaturedMovie";

export default () => {

  const [movielist, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);

  useEffect(()=>{
    const loadAll = async () => {
      //catch the movie list
      let list = await tmdb.getHomeList();
      setMovieList(list);

      //catch featured movie
      let originals = list.filter(i=>i.slug==='originals');
      let randomChosen = Math.floor(Math.random()*(originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');

      setFeatureData(chosenInfo);
    }

    loadAll();
  }, []);

  return (
    <div className="page">

      {featureData && 
        <FeaturedMovie item={featureData} />
      }

      <section className="lists">
        {movielist.map((item, key)=>(
          <Movierow key = {key} title = {item.title} items = {item.items} />
        ))}
      </section>
    </div>
  )
  }