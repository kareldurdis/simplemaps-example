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

After using it for a while I found that it doesn't allow creating own classes using Stitches yet, so I've used CSS modules instead of inlining more complex styles using css prop.

### lowdb
https://www.npmjs.com/package/lowdb

I was looking for a portable JSON database. According to https://openbase.com/categories/js/best-nodejs-json-database-libraries it's the most used (considering number of downloads and GitHub stars) portable JSON database around.

### React Query

React Query handles fetching data and provides loading and error states out of the box. I came across this library few weeks ago.

### React Window

React Window library is useful for displaying large sets of data. It renders only elements that are visible in the viewport, which improves performance and memory footprint. I found this library in some articles about React app performance about a week ago. Last release is 12/2018 and there are some open GitHub issues and PRs so it might be necessary to either pick up the development or look for alternatives. 
