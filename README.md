# campus-maps
A repo for an interactive Campus Map for Raritan Valley Community College.
https://rvcc-mapp.netlify.app 

## Update Instructions
To add a room or building to the map, there are several steps needed to be taken.

The 'map-data-FLAT.json' file contains the list of all rooms, as well as their coordiants on the 'Map-atlas.png' file

The 'Map-atlas.png' file contains all the maps needed for the A* to path-find around the RV campus, if you need to add a new path, or even a building, this is what you modify (more on that later) White paths are normal routes. Red paths are stairs (non accessible) Green paths are Elevators/Ramps (accessible) Blue Paths are normal routes but cost 3 times to traverse (for campus itself as its scale is three times less than the buildings)
These are the innermaps, as they are not seen by the user. Each innermap is in a 1920x1080 format

The Map Atlas is supplimented by the 'teleportDir.js' file This file contains all the 'teleport' nodes. Teleport nodes are places where the maps need to connect, but cannot due to the structure of the Maps. Any Stairs or Elevators are listed in this, since they 'jump' between floors. Likewise, connections between buildings, or between buildings and the campus itself are also listed here.

The Map Atlas is also suppimented by the 'floors.json' file. This file aligns the outer bounds of an inner map to its respective outer map. It is important when logging new floors, to ensure you get the furthest corners of the innermap, as to keep the proper ratio

The 'outermaps' folder contains all of the high qualitiy images to be shown to the user. Each outermap is in a 1920x1080 format.

## Known bugs/issues
Flipping the start and end rooms will sometimes cause a different path to generate (sometimes a much longer path)
SomersetHall third floor innermap is out of alignment, need to shift innermap, and relog all room coords.
A* refuses to pathfind out of the main entrance, but will pathfind in via it.

Make A* look to the next teleport as end destination for calculating H cost rather than to the end point itself.
