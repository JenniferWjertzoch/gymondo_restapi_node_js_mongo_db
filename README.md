## Gymondo Rest API in NodeJS with MongoDB 

Build a scalable RESTful API with NodeJS and Express for a set of workouts. I used MongoDB Atlas for hosting my database.

By [Jennifer Wjertzoch](mailto:wjertzochjennifer@gmail.com)

## Proposed Solution

- Install Express Framework with Node.js
- Build a fully Restful Workouts API
    - Create endpoints for workouts:
    - Add a POST endpoint that adds a workout to our list
    - Add a GET endpoint under /workouts to fetch a list of workouts
    - Add a PUT endpoint to update workouts using their ID
    - Add a DELETE endpoint with the path /workouts/:workoutId to delete workouts by their ID
- Add a MongoDB Database and connect to database
- Add Filters for category and startDate

## Libraries / Tools Used

- Node.js
- Express.js 
- MongoDB

## Setup

To install the dependencies run:

`npm install`

And to run the app:

`npm start`
