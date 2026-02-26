<?php
/* Template Name: Fullscreen Game Page */
get_header(); ?>

<div id="game-container" style="
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background: linear-gradient(135deg, #00968820, #FF000020);
">
    <style>
        #game-frame {
            width: 100%;
            height: 800px;
            border: 3px solid #000000;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        @media (max-width: 768px) {
            #game-frame {
                height: 600px;
            }
        }
    </style>
    
    <iframe 
        id="game-frame"
        src="https://benunumakoe.github.io/SkibidiMath/"
        frameborder="0"
        allowfullscreen
        loading="lazy"
    ></iframe>
</div>

<?php get_footer(); ?>
