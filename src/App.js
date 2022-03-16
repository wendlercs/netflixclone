import React, { useEffect, useState } from "react";
import tmdb from './tmdb';
import Movierow from "./components/Movierow";
import './App.css'
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

export default () => {

  const [movielist, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      //catch the movie list
      let list = await tmdb.getHomeList();
      setMovieList(list);

      //catch featured movie
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');

      setFeatureData(chosenInfo);
    }

    loadAll();
  }, []);


  //Set black header with scroll position
  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">

      <Header black={blackHeader} />

      {featureData &&
        <FeaturedMovie item={featureData} />
      }

      <section className="lists">
        {movielist.map((item, key) => (
          <Movierow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Made by WendlerCS with B7Web help.
        All rights reserved to Netflix.
        API used: themoviedb.org
      </footer>

      {movielist.length <= 0 &&
        <div className="loading">
          <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Loading"></img>
        </div>
      }
    </div>
  );
}