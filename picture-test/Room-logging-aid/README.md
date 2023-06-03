# Room Coord Logger Aid
This is a sub-program designed to aid the map makers in logging room coordiants.
It is not automatic, but greatly speeds up the proccess of marking down where rooms are located relative to the Map Atlas

## Navigation
Use Center Click (Mouse scroll wheel) to move around the canvas. You may need to use Ctrl- + (cmd- + on Mac) to see the map better. 

## How To Use
Open a local server from the tool.html file located in this folder. This will bring up the logging environment WebPage using the current Map Atlas and map-data-FLAT.json files.
The program will parse over the map data json and flag any rooms that are either not on a path (incorrectly Logged) or have a coordinate of (0, 0) (not yet logged)

The upper left of the WebPage will show which room is ready to be logged. Remeber that rooms must be Logged on a White Path. 
Rooms logged on Green or Red paths will register as accessible or non accessible, and not work, and Rooms logged on a Black pixel will never be able to be accessed.
There will almost always be a white path leading directly into the room.

Using your mouse, line up the center most dot of the crosshairs with the path that leads to the room. Use the Outermaps to locate where a room should be.

Each time you click, it will log the roomName and current mouse coordiants (so make sure you are accurate) and switch to the next room.

If a room should not be logged (not accessible to students, or not needed (such as exits, or bathrooms)) then press the [S] key to skip to the next room.

THERE IS NO WAY TO GO BACK. Once you click to log (or skip) a room, then you cannot undo, or redo it. Be sure of room placement.

Each time you log, or skip a room, the room counter (located to the right of the current room name) will count down. Once it reaches '0' and the text reads 'Done' open the JS terminal and type in ```getRooms()``` this will print out a sudo-JSON string to the console. Copy and Paste this into a NEW BLANK .JSON file.
Due to how strings are proccess, this is not in a proper .JSON format. Use Ctrl-f (Cmd-f on Mac) to find and delete all '\' characters.
Next remove the very first quotation mark (just before the curly brace '{' ) and then remove all the text up to the very last curly brace '}' (should look something like ' = $ 1" ')
Save the file. If done correctly, there should be no errors.

Cross check this new file with the original map-data-FLAT.json file (check line numbers first, the two files should exactly the same number of lines) Also check a few 'control points' room entries that where not affected by the program to make sure they are the same.

If everything validates correctly, you can now use this new .JSON file as your map-data-FLAT.json file.