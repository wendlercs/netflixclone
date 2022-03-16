import React, {useEffect, useState} from "react";
import tmdb from './tmdb';
import Movierow from "./components/Movierow";
import './App.css'

export default () => {

  const [movielist, setMovieList] = useState([]);

  useEffect(()=>{
    const loadAll = async () => {
      //catch the movie list
      let list = await tmdb.getHomeList();
      setMovieList(list);
    }

    loadAll();
  }, []);

  return (
    <div className="page">
      <section className="lists">
        {movielist.map((item, key)=>(
          <Movierow key = {key} title = {item.title} items = {item.items} />
        ))}
      </section>
    </div>
  )
  }