Slow initial load on mobile. Subsequent searches on mobile are fast. Need to optimize the loading of the inner map. Current innermap load involves manually iterating over the image. Need to speed up, or eliminate this manual iteration. (this iteration is needed to parse out the proper colors)
Perhaps the initial parsing of the inner map can be combined with creation of the A\* grid?
~~Ignore the parsing of the inner map, use the raw inner map, and adjust for colors at runtime?~~ May not work!: Need a full grid of nodes for searches!

!Picture not loading on Firefox!

Emma notes:

-   disable arrow buttons when there isn't a floor to show next/previous

-   find way to zoom in/out on canvas (touch + mouse) while keeping inner/outer map aligned (?)
    [this codepen might help?](https://codepen.io/chengarda/pen/wRxoyB)

-   find way to add a footer - will have to be dynamically added (thru js) because if I put it directly in html, it shows up before the map...

-   add favicon
-   should arrow buttons be labeled? (with what text? Thoughts: next map, next step)
-   get feedback on desktop/mobile layout
-   title for floors/building
