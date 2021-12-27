# General Assembly Project 3: Tokenizer 🪙

**_Timeframe_**

9 days

## Goal:

A group project to design a full-stack React app using Node.js, Express & MongoDB.

## Project Members:

Lukacs Papp - [<img src="https://i.stack.imgur.com/gVE0j.png" width='20px' alt="linkedin">](https://www.linkedin.com/in/lukacsjpapp/)    [<img src='https://media1.giphy.com/media/du3J3cXyzhj75IOgvA/giphy.gif?cid=ecf05e47x2g034i9pzwtzzsd3xgg2w9nr94t4tflbbgo3008&rid=giphy.gif' width='20px'>](https://github.com/lukacspapp)

Gayatri Rajgor - [<img src="https://i.stack.imgur.com/gVE0j.png" width='20px' alt="linkedin">](https://www.linkedin.com/in/gayatrirajgor/)    [<img src='https://media1.giphy.com/media/du3J3cXyzhj75IOgvA/giphy.gif?cid=ecf05e47x2g034i9pzwtzzsd3xgg2w9nr94t4tflbbgo3008&rid=giphy.gif' width='20px'>](https://github.com/gayatrirajgor)

Ricardo Rivera-Cabrera - [<img src="https://i.stack.imgur.com/gVE0j.png" width='20px' alt="linkedin">](https://www.linkedin.com/in/rjriverac/)    [<img src='https://media1.giphy.com/media/du3J3cXyzhj75IOgvA/giphy.gif?cid=ecf05e47x2g034i9pzwtzzsd3xgg2w9nr94t4tflbbgo3008&rid=giphy.gif' width='20px'>](https://github.com/rjriverac)

## Technologies Used

- React.js
- Node.js
- Express
- MongoDB/Mongoose
- SASS
- Semantic UI React
- Axios
- Recharts
- HTTP-proxy-middleware
- Bcrypt
- jsonwebtoken
- date-fns
- Animate.css


[<img src="https://i.stack.imgur.com/gVE0j.png" width='20px' alt="linkedin">](https://www.linkedin.com/in/lukacsjpapp/)    

### Deployed version

[here](https://tokenizer-nft.herokuapp.com/)

## Code Installation

https://github.com/purvitrivedi/search-and-play

- Clone or download the repo
- Install yarn in Terminal by typing: <code>yarn</code>
- Start server with <code>yarn start</code>

## Planning

### Testing the API on Insomnia

We were pretty set on using a music-based API and since this was a hackathon, iTunes Search API was the most accessible.

The API returns 200 media (music, podcasts, videos etc.) results based on a query. For music media, the results included track details, album covers and previewTrackURL.

We found 4 queries that we could use on our app:

By default the API would give 50 results, so we added <code>limit=200</code> in the URL as that is the maximum amount of results it can give us.

<img src="src/assets/insomnia.png" alt="insomnia" />

- Search by Word: https://itunes.apple.com/search?term=solange&media=music&entity=song&limit=200

- Search by Word in Song: https://itunes.apple.com/search?term=garden&attribute=songTerm&media=music&entity=song&limit=200

- Search by Word in Artist Name: https://itunes.apple.com/search?term=cutchemist&attribute=artistTerm&media=music&entity=song&limit=200

- Search by Word in Album Name: https://itunes.apple.com/search?term=butterfly&attribute=albumTerm&media=music&entity=song&limit=200

### Prototypes with Miro

We decided to have a simple two-page app: Home Page (/) & Tracks Page (/tracks). The Tracks page would show all the results as an index until a user clicked on one of them. On click, the album index will skew, make space for the track and play it.

<img src="src/assets/home-page-miro.png" alt="home-page" width="300" /> <img src="src/assets/album-index-miro.png" alt="album-index" width="300" /> <img src="src/assets/artist-show-miro.png" alt="artist-show" width="300" />

## Development

### The Home Page

<img src="src/assets/home-page-site.png" alt="home-page-site"/>

The Home page along with the Search Bar make two common components of the app. On load, the homepage calls <code>componentDidMount</code> function using axios for the home page styling. The axios request <code>getAllSongs</code> is in the lib -> api.js file:

    export const getAllSongs = (term, attribute) => {
      if (attribute === 'Any') {
        return axios.get(`https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=${term}&media=music&entity=song&limit=200`)
      }
      else {
        return axios.get(`https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=${term}&attribute=${attribute}&media=music&entity=song&limit=200`)
      }
    }

<em><code>cors-anywhere.herokuapp</code> was added after the deployed on Heroku so we are not blocked by CORS policy.</em>

The search bar is a child component of the Home Page. It collects the search team and attribute(such as 'All', 'songTerm', 'artistTerm' & 'albumTerm'). Once we hit enter, we pass these as props by adding them to URL of the Music Index Page.

    handleSubmit = (event) => {
      let term = this.state.search.term
      if (!term) {
        this.setState({ validate: false })
        return
      }
      let attribute = (this.state.search.attribute ? this.state.search.attribute : 'Any')
      this.props.history.push(`/tracks/${term}&${attribute}`)
    }

### Music Index Page

![Music Index](src/assets/album-index-gif.gif)

On loading, the Music Index Component retrieves the 'term' and 'attribute' values from the URL and adds them to the <code>getAllSongs</code> GET request:

    const urlDetails = this.props.location.pathname
        const term = urlDetails.split('/')[2].split('&')[0].replace(' ', '+')
        const attribute = urlDetails.split('/')[2].split('&')[1]


There are two events on the displayed album covers:

onMouseEnter: show the track and artist name in the NavBar
onMouseClick: Skew the index and show the artist details and play the song.

    handleClick = (event) => {
      this.setState({ isSkewedIndex: true })
      setTimeout(() => { this.setState({ singleArtist: event, isShowingArtist:  true, volume: 0.6 }) }, 500)
    }

We enable the page to show the track on the right side by using Boolean state values and conditional rendering.

    <div
    className={`container column
    ${this.state.isSkewedIndex ? 'slidingAnimation' :'slidingBackAnimation'}
    ${this.state.isShowingArtist ? 'not-hidden' : 'hidden'}`}>
        <MusicShow
        {...this.state.singleArtist}
        onClick={this.handleBackClick}
        volume={this.state.volume}/>
    </div>

### Artist Show Section:

On click, the index skews to left half of the page:

    .skew {
      transform: rotateY(55deg) skew(-13deg) scale(0.95);
      box-shadow: 4px 10px 36px -2px rgb(241, 240, 169);

      @media (max-width: 800px) {
        display: none;
      }
    }

and the Artist show section comes in with Sliding Animation:

    .slidingAnimation {
      animation: slide 1s ease;
      animation-fill-mode: forwards;
      background-image: linear-gradient(
        to right,
        rgba(247, 247, 247, 0),
        rgb(10, 10, 9)
      );
      right: -400px;
    }

    @keyframes slide {
      100% {
        right: 0px;
      }
    }

In this page, we use the React Audio Player as it's slightly better than HTML5 Audio player. We set it to 'autoplay' so the song begins playing as the page animates into this section:

    <ReactAudioPlayer autoPlay controls={true} src={props.previewUrl} volume={props.volume}/>

### Finishing Touches & Styling

In the last 4-5 hours, we focused on adding some finishing touches:

* Adding back button on the Music Index Page
* Styling the artist show section with flexbox
* Adding flashes to the music index. This was done by re-rendering the page on a timer and assigning <code>className="flash"</code> to random albums.
* Styling the Home Page

## Wins

Styling :sparkles: . Very pleased with how fun this app is, we learnt so much about animations, timers and using conditional rendering.

Teamwork :raised_hands: . This was the first time I pair-coded for almost 2 days and it was a wonderful experience. Rob and I were always in sync and found that bouncing personal ideas off each other always resulted in something better.

## Challenges

CORS :no_entry_sign: . While we were able to solve this easily after deployment, the why of it took me a while to fully understand. Our tutor was very helpful in explaining CORS in details.

### Bugs

Audio Volume: We set the audio volume as 0.6 as a starting point so its not too loud for the user. Due to this, it is not possible to change the volume of the track. We struggled to figure out if React Audio Player's volume can be changed through state -- so this will be a bug we need to solve in future.


## Key Learnings

* React.js: As this was my first React App, I learned a lot about conditional rendering, how state works and how to pass props using URLs.

* CSS Animations: Not only was this fun, but I feel very confident working with transitions and animations after this project.


## Future Improvements

* Make it Responsive
* Audio Fade in and out

