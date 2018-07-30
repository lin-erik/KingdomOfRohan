# Moodvie

Serving you movies based on your mood

## Team

  - __Product Owner__: Parker Muir
  - __Scrum Master__: Martin Glyer
  - __Development Team Members__: Frank Cork, Kiernen Hahn

## Table of Contents

1. [Team](#team)
1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)

## Usage

#### Global Search

Note: This feature is usable without signing up or logging in to the site.

Simply select from our list of provided moods. Should you wish to search by more than one mood, click the "Add Mood" button.  You may search by up to 3 moods.

You will be returned 5 movies from our database.  These are the top movies that our users have tagged with the moods you input.

#### Profile Page

After signing up or logging in, you will be directed to your profile.  If this is your first time logging in, there will be a search bar where you can type in a movie you have seen.  Select the correct movie after your search by clicking the "Rate This Movie" button.

You will be shown the movie poster, and may tag it with as many moods that you feel apply to the movie from the drop down menu as you would like.  Once satisfied, hit the "Submit" button.

This movie will then be saved to your history of movies, and your tags added to our database...helping other visitors find the movies they want!

#### Recommendations Bar

An unused component (client/components/RecList.jsx) and function (server/controllers/serverhelpers.js, filterRecs) that displays a list of movies based on the most recent 'mooded' movie by a user that does not include any of the movies that user has already seen.  

## Requirements

- Axios
- Body-Parser
- Express
- Mongoose
- React 
- React-dom
- React-router-dom


## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```