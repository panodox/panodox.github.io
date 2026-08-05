// ===============================
// panodox
// script.js
// ===============================


document.addEventListener("DOMContentLoaded", () => {


    const card = document.querySelector(".card");

    const cursor = document.getElementById("cursor-glow");

    const sections = document.querySelectorAll("section");

    const footer = document.querySelector("footer");

    const comment = document.querySelector(".comment");




    // ------------------------------------
    // Fade in
    // ------------------------------------


    requestAnimationFrame(() => {

        document.body.classList.add("loaded");

    });







    // ------------------------------------
    // Intro typing
    // ------------------------------------


    const line1 = document.getElementById("line1");

    const line2 = document.getElementById("line2");



    function typeText(element, text, speed, callback) {


        let i = 0;


        function typing() {


            if (i < text.length) {


                element.textContent += text[i];


                i++;


                setTimeout(
                    typing,
                    speed
                );


            } else {


                if(callback)
                    callback();


            }


        }


        typing();


    }





    typeText(

        line1,

        "high school student",

        65,

        () => {


            typeText(

                line2,

                "thinking about math and science",

                45

            );


        }

    );








    // ------------------------------------
    // Live date/time
    // ------------------------------------


    const dateElement =
        document.getElementById("date");


    const timeElement =
        document.getElementById("time");




    function updateClock(){


        const now = new Date();



        dateElement.textContent =

            "last updated: " +

            now.toLocaleDateString("en-AU");



        timeElement.textContent =

            "local time: " +

            now.toLocaleTimeString(
                "en-AU",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );


    }



    updateClock();

    setInterval(updateClock,1000);








    // ------------------------------------
    // Custom Cursor
    // ------------------------------------


    let mouseX = 0;

    let mouseY = 0;


    let cursorX = 0;

    let cursorY = 0;




    window.addEventListener(
        "mousemove",
        e => {


            mouseX = e.clientX;

            mouseY = e.clientY;


        }
    );





    function animateCursor(){


        cursorX +=
            (mouseX - cursorX) * 0.35;


        cursorY +=
            (mouseY - cursorY) * 0.35;



        cursor.style.left =
            cursorX + "px";


        cursor.style.top =
            cursorY + "px";



        requestAnimationFrame(
            animateCursor
        );


    }



    animateCursor();






    // Cursor grows on links


    document.querySelectorAll("a")
    .forEach(link => {


        link.addEventListener(
            "mouseenter",
            () => {


                cursor.style.width =
                    "22px";


                cursor.style.height =
                    "22px";


            }
        );



        link.addEventListener(
            "mouseleave",
            () => {


                cursor.style.width =
                    "12px";


                cursor.style.height =
                    "12px";


            }
        );


    });









    // ------------------------------------
    // Card tilt
    // ------------------------------------



    window.addEventListener(
        "mousemove",
        e => {


            const rect =
                card.getBoundingClientRect();



            const x =
                e.clientX - rect.left;


            const y =
                e.clientY - rect.top;



            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;



            const rotateY =
                ((x-centerX)/centerX)*1.3;



            const rotateX =
                -((y-centerY)/centerY)*1.3;





            card.style.transform =

            `

            perspective(1400px)

            rotateX(${rotateX}deg)

            rotateY(${rotateY}deg)

            translateY(-2px)

            `;



            card.style.boxShadow =

            `

            ${rotateY*5}px

            ${20 + rotateX*-4}px

            55px

            rgba(0,0,0,.07)

            `;



        }
    );






    document.addEventListener(
        "mouseleave",
        () => {


            card.style.transform =

            "perspective(1400px) rotateX(0deg) rotateY(0deg)";



            card.style.boxShadow =

            "0 18px 55px rgba(0,0,0,.07)";


        }
    );









    // ------------------------------------
    // Section reveal
    // ------------------------------------


    const observer =
        new IntersectionObserver(

            entries => {


                entries.forEach(entry => {


                    if(entry.isIntersecting){


                        entry.target.classList.add(
                            "visible"
                        );


                    }


                });


            },

            {
                threshold:0.15
            }

        );



    sections.forEach(
        section =>
            observer.observe(section)
    );


    observer.observe(footer);








    // ------------------------------------
    // Floating card
    // ------------------------------------


    let t = 0;


    function floatCard(){


        t += 0.008;


        const y =
            Math.sin(t)*2;



        card.style.marginTop =
            `${y}px`;



        requestAnimationFrame(
            floatCard
        );


    }


    floatCard();








    // ------------------------------------
    // Floating Dust
    // ------------------------------------


    const dust =
        document.getElementById("dust");



    for(let i=0;i<45;i++){


        const particle =
            document.createElement("div");



        particle.className =
            "dust-particle";



        particle.style.left =
            Math.random()*100 + "%";



        particle.style.animationDuration =
            (15 + Math.random()*25) + "s";



        particle.style.animationDelay =
            (-Math.random()*20) + "s";



        const size =
            1 + Math.random()*3;



        particle.style.width =
            size+"px";


        particle.style.height =
            size+"px";



        dust.appendChild(
            particle
        );


    }









    // ------------------------------------
    // Keyboard easter egg
    // Type "math"
    // ------------------------------------


    let typed = "";



    window.addEventListener(
        "keydown",
        e => {


            typed +=
                e.key.toLowerCase();



            if(typed.length > 10)

                typed =
                    typed.slice(-10);




            if(typed.includes("math")){


                document.body.classList.add(
                    "math-mode"
                );



                setTimeout(
                    () => {

                        document.body.classList.remove(
                            "math-mode"
                        );

                    },

                    2500

                );



                typed="";


            }


        }
    );








    // ------------------------------------
    // Random greeting
    // ------------------------------------


    const greetings = [

        "// HELLO",

        "// WELCOME",

        "// GOOD EVENING",

        "// GOOD MORNING",

        "// HI"

    ];



    if(Math.random()<0.02){


        comment.textContent =

            greetings[
                Math.floor(
                    Math.random()*greetings.length
                )
            ];


    }



// ------------------------------------
// Visitor Counter
// ------------------------------------

const visitorElement =
    document.getElementById("visitor-count");


let visits =
    localStorage.getItem("panodox-visits");


if (visits === null) {

    visits = 67;

} else {

    visits++;

}


localStorage.setItem(
    "panodox-visits",
    visits
);



visitorElement.textContent =
    String(visits).padStart(4, "0");




    // ------------------------------------
    // Console message
    // ------------------------------------


    console.log(`

────────────────────────────

hello :)

thanks for looking around.

— panodox

────────────────────────────

`);



});
