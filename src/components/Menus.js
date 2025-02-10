import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import Specialdishes from "./Specialdishes";
import FilteredDishes from "./FilteredDishes";

function Menus() {
    const [menu, setMenu] = useState([]);
    const [category,setCategory] = useState([]);

    const fetchData = async () => {
        const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?f=a";
        let response = await fetch(API_URL);
        let result = await response.json();
        console.log(result,"result")
         setMenu(result.meals);
       
    };
    const fetchcategoryData = async () => {
        const API_URL = "https://www.themealdb.com/api/json/v1/1/categories.php";
        let response = await fetch(API_URL);
        let categoryresult = await response.json();
        setCategory(categoryresult.categories);
           
       
    };
   
    useEffect(() => {
        fetchData();
        fetchcategoryData();
    }, []);

    return (
        <div>
       <Hero/>
       <Specialdishes specialmenu={menu}/>
       <FilteredDishes allmenulist={category} allmenu={menu}></FilteredDishes>
           
        </div>
    );
}

export default Menus;
