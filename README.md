# Find Mentor

The project's aim is to collect feedback from people. 
- Find & match mentors/mentees
    - w/o contract,
    - w/o protocol,
    - w/o ego
- Helps to understand the basics of being mentee / mentor.
- Helps to find new work buddies/pairs.


[![Page view](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fcagataycali%2Ffind-mentor&count_bg=%2379C83D&title_bg=%23555555&icon=hey.svg&icon_color=%23E7E7E7&title=Page%20view&edge_flat=false)]()

## API

**Get all persons by:**

```bash
curl https://findmentor.network/persons.json
```

```javascript
fetch("https://findmentor.network/persons.json")
  .then(res => res.json())
  .then(console.log);
```

*Get all active mentorships by:*

```bash
curl https://findmentor.network/activeMentorships.json
```

```javascript
fetch("https://findmentor.network/activeMentorships.json")
  .then(res => res.json())
  .then(console.log);
```

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
