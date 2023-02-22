

    
                    async function checkPswd() {

                        var confirmPassword = "test";

                        var password = document.getElementById("pswd").value;
                        if (password == confirmPassword) {
                             window.location="html/contact.html";
                        }
                        else{
                            alert("Passwords do not match. " + confirmPassword);
                        }

                        await createCode();
                    }

                    function getLetters(r, g, b, a)
                    {
                        return "abcdefghijklmnopqrstuvwxyz"[parseColor(r, g, b, a)];
                    }

                    function parseColor(r, g, b, a)
                    {
                        return r + g + b;
                    }


                    async function loadImage(url) { 
                    //With a Promise
                    return new Promise((resolve,reject) => {

                            //Set up new image
                            let img = new Image();

                            //Set up callback to resolve the image
                            img.onload = () => {
                                resolve(img);
                            }

                            //Set it in motion
                            img.src = url;

                        });

                    }

                    //Async snag color
                    async function snagColor(url,x,y) {

                        //Grab image (await for it to load)
                        let image = await loadImage(url);

                        //Set up internal canvas
                        let canvas = document.createElement('canvas');
                        let c = canvas.getContext("2d");

                        //Adjust canvas size
                        canvas.width = image.width;
                        canvas.height = image.height;

                        //Draw image to canvas
                        c.drawImage(image,x,y);

                        //Snag the databuffer representing the image data
                        let data = c.getImageData(0,0,canvas.width,canvas.height).data;

                        //Skip over the data buffer to the spot
                        let s = (y*image.width + x) * 4;

                        //Return rgba
                        console.log([data[s+0],data[s+1],data[s+2],data[s+3]]);
                        return [data[s+0],data[s+1],data[s+2],data[s+3]];
                    }

                    async function createCode()
                    {
                        let image = await loadImage("img/colorCodeBi.png");

                        var create = "";

                        for(x = 0; x <image.width; x++ )
                        {
                            for(y = 0; y < image.height; y++)
                            {
                                create += getLetters(snagColor("img/colorCodeBi.png",x,y));
                            }
                        }

                        alert(create);
                    }