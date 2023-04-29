Slow initial load on mobile. Subsequent searches on mobile are fast. Need to optimize the loading of the inner map. Current innermap load involves manually iterating over the image. Need to speed up, or eliminate this manual iteration. (this iteration is needed to parse out the proper colors)
Perhaps the initial parsing of the inner map can be combined with creation of the A\* grid?
~~Ignore the parsing of the inner map, use the raw inner map, and adjust for colors at runtime?~~ May not work!: Need a full grid of nodes for searches!

!Picture not loading on Firefox!

\*\*\*disable arrow buttons when there isn't a floor to show next/previous
