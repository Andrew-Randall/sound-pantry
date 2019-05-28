# README

[![Codeship Status for Andrew-Randall/sound-pantry](https://app.codeship.com/projects/b13ba490-5323-0137-f64d-0200e4f4fbdf/status?branch=master)](https://app.codeship.com/projects/340604)

DESCRIPTION

Sound Pantry is an app where musicians host sounds of their own creation for others to download and sample in their music. After signing up through Devise and creating a new sound pack, a user can drag and drop sound files to upload via react-dropzone. The files, which are stored on Amazon Web Services, are now available for others to preview and download. The app features a drum machine built with Tone.js in React, populated by samples from the database. Navigate to the drum machine tab and follow the instructions on the screen to begin drumming with your computer keyboard.

https://sound-pantry.herokuapp.com/

FEATURES:

- Sign in, sign up, sign out
- Create a Collection  
- Drag and drop sounds to upload
- Admin functionality and privileges
- Drum machine playable with computer keyboard

TECHNOLOGIES:

- Ruby (2.4.5) on Rails (5.2.3)
- React (react-router-v3)
- Tone.js
- Devise
- Jasmine/Enzyme
- RSpec
- PostgreSQL
- Media Queries
- CSS Grid
- Google Fonts API

SET UP:

-Clone the repo to your machine
-Create the database with "rake db:create"
-Run the migrations with "rake db:migrate"
-Seed the database with initial data with "rake db:seed"
-In one terminal window, run  "rails s"
-In a second terminal window, run "yarn run start"
-Direct your browser to localhost:3000

AUTHORS:

Andrew Randall
