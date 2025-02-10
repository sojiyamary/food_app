import React, { useState, useEffect } from 'react';

function FilteredDishes(props) {

    // Track the allmenu state, initially set to props.allmenu
    const [allmenu, setAllmenu] = useState([]);

    // Filtered results for the selected category
    const [filterresult, setFilterresult] = useState([]);

    // Log props.allmenu on each render to see what's being passed
    // console.log("props menu", props.allmenu);

    // Whenever props.allmenu changes, update the allmenu state
    useEffect(() => {
        if (props.allmenu && props.allmenu.length > 0) {
            // console.log("Updating allmenu with props.allmenu", props.allmenu);
            setAllmenu(props.allmenu);
        } else {
            // console.log("props.allmenu is empty or undefined");
        }
    }, [props.allmenu]); // Run the effect whenever props.allmenu changes

    // Show dishes based on the selected category
    function showfiltercategory(category) {
        const filterresults = allmenu
        
            .filter((item) => item.strCategory === category)
            .map((item) => (
                
                <li key={item.idMeal}> {/* Ensure each list item has a unique key */}
                    <img src={item.strMealThumb} className="br" alt={item.strMeal} />
                    <h3 className="text-center">{item.strMeal}</h3>
                </li>
            ));
        setFilterresult(filterresults);
    }

    // Log when filterresult changes
    useEffect(() => {
        // console.log("Updated filterresult:", filterresult);
    }, [filterresult]);

    const Allmenucategory = props.allmenulist.map((menuItem) => (
        
        <li key={menuItem.strCategory} onClick={() => showfiltercategory(menuItem.strCategory)}>
            {menuItem.strCategory}
        </li>
    ));

    return (
        <div className='Filteredlist'>
            <div className='container text-center'>
                <h2>Choose your Dishes</h2>
                <p>lorem ipsum dollar sit amet</p>
                <ul className="flex flex-wrap gap-30">
                    {Allmenucategory}
                </ul>
                <div className='filteresdishes'>
                    <ul className="flex flex-wrap gap-30">
                    {filterresult.length > 0 ? (
                            filterresult
                        ) : (
                            <li className='no-item-found'>No items found</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default FilteredDishes;
