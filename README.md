This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```
## The task

You will be processing, transforming, storing, transforming (again), and displaying some data.

### 1. Input Data

Simplemaps provides multiple geographical datasets, some subsets even free of charge. We will be using database of US cities as our input data.

You can easily download the free dataset from https://simplemaps.com/data/us-cities.


### 2. Storage

Create a database (use any database system you like or want to try) to store state, county, and city names and IDs, and load data from the CSV file.
Data should be stored in de-normalized format.

### 3. Transforming tree

Next you will need to transform data into a tree format (State > County > City)

* Write an algorithm that will output such tree.
* What is the complexity of your algorithm (in big O notation) ?


### 4. Visualizing Data

* Design and build an interface to display this data.
* Add a search component over the data.

<hr/>

Feel free to use any tools, frameworks or libraries. Whatever you are most comfortable with or something new that you wanted to try. Just let me know what you chose, why, and what was your previous experience with it.


## Tech stack

### Next.js
Probably the best current SSR solution for React apps.

### NextUI
I wanted to try this UI library. Bootstrap is nice, but the design is a bit dry. I wanted to try something with more modern look.

### lowdb
https://www.npmjs.com/package/lowdb

I wanted something portable. According to https://openbase.com/categories/js/best-nodejs-json-database-libraries it's the most used (considering number of downloads and GitHub stars) portable JSON database around.

Otherwise I'd use something like CouchDB or Mongo (I've never worked with either of them though).
