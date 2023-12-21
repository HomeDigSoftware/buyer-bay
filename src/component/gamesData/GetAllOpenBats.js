import React, { useState } from 'react';
import supabase from '../../services/supabase.js';
import BatsCard from './BatsCard.js';

export default function GetAllOpenBats() {
  const [todayOpenBats, setTodayOpenBats] = useState({});
  const [nextDayOpenBats, setNextDayOpenBats] = useState({});
  const [showPanel, setShowPanel] = useState(false);
  const date = new Date();
  const curr_year = date.getFullYear(date);
  const curr_month = date.getMonth(date) + 1;
  const curr_day_in_month = date.getDate(date);
  const curr_hour = date.getHours(date);
  const curr_minute = date.getMinutes(date);

  async function getUpcoming() {

    const { data, error } = await supabase
      .from("bat_list")
      .select()
      .match({
        match_ok: "false",
      })
      .gt("year", curr_year - 1)
      .gt("month", curr_month - 1)
      .gt("day", (curr_day_in_month));

    // console.log("upcoming match  : ", data, data[0]?.id);
    setNextDayOpenBats(data);


    getmatches();
  }

  async function getmatches() {
    const { data, error } = await supabase
      .from("bat_list")
      .select()
      .match({
        match_ok: "false",
        day: curr_day_in_month,
        year: curr_year,
        month: curr_month,
      })
      .gt("hour", curr_hour);
    // console.log(" D / Y / M / H", curr_day_in_month, curr_year, curr_month, curr_hour);
    setTodayOpenBats(data);
    setShowPanel(!showPanel);
  }
  return (
    <div className=' m-auto'>
      <button className="token-btn btn btn-secondary m-auto"
        onClick={() => getUpcoming()}>
        today bats
      </button>
      {showPanel ? <BatsCard nextBats={nextDayOpenBats} todaybats={todayOpenBats} setShowPanel={setShowPanel} /> : <div></div>}
   
    </div>

  );
}
