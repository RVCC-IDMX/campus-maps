//Blarf! Doesn't work on all browsers yet.
//import rooms from "./map-data-FLAT.json" assert { type: "json" };

//When the window loads up
window.addEventListener('load',async () => {

    //Load the flat data
    let response = await fetch('./map-data-FLAT.json');
    let rooms = await response.json();

    //Search rooms function -- yes this is not optimal inside this scope...
    function searchRooms(str) {

        //Uppercase for now
        str = str.toUpperCase();

        //An array for our results
        let results = [];
        
        //No input? No hits.
        if (str.length == 0) return results;

        //Go over each name and check for partial matches
        for (var name in rooms) {
            if (name.substring(0,str.length) == str)
                results.push(name);
            if (results.length >= 10) return results;
        }

        //Return the array.
        return results;
    }

    //Link up each predicative-search
    document.querySelectorAll('.predicative-search').forEach((item) => {

        //The .predicative-field
        let field = item.querySelector('.predicative-field');
            field.addEventListener('input',async (e) => {
                let background = item.querySelector('.predicative-background');
                    
                //Search splice to ensure the same case
                let prediction = field.value 
                                + searchRooms(field.value)
                                    .join(', ')
                                    .toLowerCase()
                                    .substring(field.value.length);
                
                background.value = prediction;
            });

    });

});