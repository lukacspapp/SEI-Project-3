# General Assembly Project 3 - Tokenizer <img src="https://i.imgur.com/aDlFCzn.png"  alt="tokenizer">

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

# Tokenizer

A MERN-Stack NFT E-commerce app. Users can view, buy and upload their own nft. Once a user is registered they can uploadand edit thier nft. All nfts has their own price charts so users can follow price fluctuations of all nfts.

[<img src="https://i.imgur.com/qlCRYXF.png"  alt="linkedin">](https://tokenizer-nft.herokuapp.com/)    

### Deployed version

[<img src="https://i.imgur.com/aDlFCzn.png"  alt="tokenizer">](https://tokenizer-nft.herokuapp.com/)

## Code Installation

https://github.com/lukacspapp/SEI-Project-3

- Clone or download the repo
- Install dependencies by running <code>yarn</code> Terminal
- Start the database by running <code>mongod --dbpath ~/data/db</code>
- Start the server by running <code>yarn serve</code>
- Go to frontend folder using <code>cd frontend</code> terminal command
- Run the frontend using <code>yarn start</code>

## Planning

We have decided to build the backend together. One person was sharing screen and the other two guided the coding person. The backend part took three full days to build out and each member of the group coded for one day during that time. For the frontend we used Assana [<img src="https://cdn.worldvectorlogo.com/logos/asana-logo.svg" width='20px'  />](https://app.asana.com/) to plan out responsibilities for each member.

<img src="https://i.imgur.com/nlJIZIj.png" />

### Wireframe

We planned out the basic look of tha application on Jamboard [<img src="https://i.imgur.com/z3sAHmM.png" width='20px'  />](https://jamboard.google.com/d/1zeemytBD6dOylNV8AHH5jVvw1_8ZdwcZpfOF2kf9Lbo/viewer)

<img src="https://i.imgur.com/9eunZc0.png" alt="lukacs" width="400" /> <img src="https://i.imgur.com/BZ9SWq0.png" alt="gayatry" width="400" /> <img src="https://i.imgur.com/65ruUj0.png" alt="ricardo" width="400" /> <img src="https://i.imgur.com/xxzKnoy.png" alt="lukacs" width="400" />

# Process

As each of us had our Backend areas to work on, we first planned out what models, controllers & routes each of us will be writing before moving on to the code session. We also decided on which aspects of our models will be embedded or referenced.

Our notes are outlined in the next section with code examples.

## Backend (Day 1 to 3)

We had a strong start as the three of us finished the Backend by the end of Day 3. On Day 2, We worked on our models, controller and routes. On Day 3, we troubleshooted bugs together.

### Models

**From initial notes**:

> **NFT**
>
> - [Token | Image | Category | Name | Owner | Available | Current price | Transactions(embedded)](https://github.com/lukacspapp/SEI-Project-3/blob/main/models/nft.js) 

```
const nftSchema = new mongoose.Schema({
  token: { type: String },
  image: { type: String, required: true, unique: true },
  category: { type: String },
  name: { type: String, required: true, unique: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  available: { type: Boolean, required: true },
  currentPrice: { type: Number, min: 0 },
  transactions: [transactionSchema]
})
```



> **Transaction**:
>
> - [Type | From | To | Price | Time stamp](https://github.com/lukacspapp/SEI-Project-3/blob/main/models/nft.js)

```
const transactionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  from: { type: mongoose.Schema.ObjectId, ref: 'User' },
  to: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  price: { type: Number, required: true }
},
{
  timestamps: true
})
```

> **User**:
>
> - [Username | Email | Password | Cart(embedded) | Time stamp](https://github.com/lukacspapp/SEI-Project-3/blob/main/models/user.js)

```

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxlength: 30 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [cartItem]
},
{
  timestamps: true
})

const cartItem = new mongoose.Schema({
  item: { type: mongoose.Schema.ObjectId, ref: 'Nft', required: true, unique: true, sparse: true }
})
```

Andy then referenced the favorited & completed hikes in the Hike model to show a logged-in user if they had taken any actions with the hike they were viewing:

    hikeSchema
      .virtual('usersFavorited', {
        ref: 'User',
        localField: '_id',
        foreignField: 'favoritedHikes'
      })

**Another example:**

Kuriko created the group model, with members as embedded data:

    const groupMemberSchema = new mongoose.Schema({
      user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
    }, {
      timestamps: true
    })

    const groupSchema = new mongoose.Schema({
      name: { type: String, required: true, unique: true },
      createdMember: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
      members: [ groupMemberSchema ],
      headerImage: { type: String, required: true },
      description: { type: String, required: true, maxlength: 500 },
      userAddedImages: [ userAddedImageSchema ],
      messages: [ groupMessageSchema ],
      events: [ eventSchema ]
    }, {
      timestamps: true
    })

I was then able to reference the Group model, so a profile would include the list of groups joined by the user:

        // * for groups joined by user
        userSchema
          .virtual('joinedGroups', {
            ref: 'Group',
            localField: '_id',
            foreignField: 'members.user'
          })

### Controllers

**From initial notes**:
> Create, Read, Update and Delete Methods were written for:
>
> - Hikes, Reviews and Hike Images
> - Groups, Group Images, Chats, Events, Members
> - Login, Register, Profiles, user favorited Hikes and completed hikes

Since we had a lot of embedded and referenced data, we used array methods such as <code>flatMap</code> and <code>reduce</code> so we didn't populate unneccesary data in a request. For examples, in order to simply get the id of the groups a user has joined, I wrote this inside the <code>userShow</code> function:

    if (user.joinedGroups) {
      user.joinedGroups = user.joinedGroups.flatMap(item => item.\_id).reduce((arr,curr)  => {
      if (arr.length === 0) {
      arr.push(curr)
      }
      if (!arr.find(item => item.\_id === curr.\_id)) {
      arr.push(curr)
      }
      return arr
    }, [])

## Frontend (Day 4 to 8)

On day 4, we moved on to Frontend. After setting up the React App, installing HTTP proxy middleware and Nodemon, we began our work on Hikes(Andy), Groups(Kuriko) and Users(me!).

For Authentication, I wanted a user to design the process like [Ableton's](https://www.ableton.com/en/login/), which meant:

- The Login and Register options were on the same page and;
- The used was logged in automatically after they registered.

<img src="frontend/src/styles/assets/README/login.png" alt="login-page" />

To do this I ensured that both register and login controllers returned a token on the backend. On the frontend, once a user registered - I logged them in and sent them to the Hikes Index page:

    handleSubmit = async (event, path) => {
      event.preventDefault()
      try {
        const res = await registerUser(this.state.formData)
        setToken(res.data.token)
        path.push('/hikes')

      } catch (err) {
        this.setState({ errors: err.response.data.errors })

      }
    }

For User Profile, I took the opportunity to explore **conditional rendering** further. This meant:

- The user would never leave the page when they wanted to make edits.
- The page would show different things based on a user's actions

 <img src="frontend/src/styles/assets/README/profile.png" alt="profile-page" />

For example, on for the Bio on the user's profile page:

    <div className="columns is-multiline">
      <h1 className="subtitle column is-full">About me...</h1>

      // * If "profile edit" is enabled, show the Edit Bio button

      {this.state.edit && <p onClick={this.enableEditBio} className="edit-bio">Edit bio</p>}

      // * If showBio is true (i.e Edit Bio has not been clicked) - Show the Bio

      {this.state.showBio && <div>
      <p className="bio">
      {profile.bio}
      </p></div>}

      // * If showBio is false, then show a text area input wher user can edit the bio:

      {!this.state.showBio &&
        <div className="columns is-multiline">
            <textarea
            className="textarea column"
            value={this.state.bio}
            onChange={this.handleChange}
            name="bio"
            />
            <p className="edit-bio-btn column is-centered" onClick={this.sendPutRequest}>Submit</p>
        </div>}
    </div>

The profile page also showed different things based on whether the user was the owner of the profile. For example, the owner got an option to add more completed hikes from their profile page:

    <div className="column columns is-multiline"
    //* if the user is the owner, give option to add Hikes

      {isOwner(profile._id) &&_id} handleSubmit={this.addCompHike} /></div>
      <div className="completed">{completedHikes}</div>

    </div>

Other than working on app navigation, I also pair programmed with Andy on:

- Adding "Add to Favorites" button & 'Average Rating" on Hike Show Page
- Error handling and styling of forms on Hike and User profile pages.

For Average ratings, we used a **callback function**. This ensured the average rating would not be calculated until we posted the rating AND received the updated Hike data from the backend.

    handleSubmitReview = async (event, rating, text) => {
      event.preventDefault()
      try {
        const hikeId = this.props.match.params.id
        await reviewHike(hikeId, { rating: rating, text: text })
        const res = await getSingleHike(hikeId)
        this.setState({ hike: res.data, errors: '', reviewText: '', reviewRating: '' },
          () => {
            this.getAverageRating()
          })
      } catch (err) {
        this.setState({ errors: JSON.parse(err.response.config.data) })
      }
    }

## Seeding (Day 9)

The final day was spent populating the database with Hikes, Groups and Users. We ensured that Hikes and Groups were created by random users by writing this script in seeds.js:

    const hikesWithUsers = hikeData.map(hike => {
      return { ...hike, user: createdUsers[Math.floor(Math.random() * createdUsers.length)]._id }
    })

    const groupsWithUsers = groupData.map(group => {
      return { ...group, createdMember: createdUsers[Math.floor(Math.random() * createdUsers.length)]._id }
    })

## Challenges

**Planning**:

While we did a great job planning as a team, it was slightly challenging as I was still full trying to understand the difference between Embedded and Referenced Data. Fortunately, this was the perfect project to solidify my understanding in this area.

**Navigating from one user profile to another**:

This was an interesting challenge and I very much enjoyed solving it.

**The problem**: If a user was a different user's profile page and then attempted to go to their own profile from the Navbar, they couldn't as the link structure was similar: /profile/:id. This meant that while the link would change in the address bar, the page would not re-render.

**Solution**: Using <code>componentDidUpdate</code> on the Profile component:

    componentDidUpdate = async (prevProps) => {
       if (prevProps.location.pathname.includes('/profiles/') && this.props.location.pathname.includes('/profiles/')) {
         if (this.props.location.pathname !== prevProps.location.pathname) {
           const id = this.props.match.params.id
           const res = await getUser(id)
           this.setState({ profile: res.data, bio: res.data.bio, image: res.data.profileImage, fullName: res.data.fullName })
         }
       }
     }

## Wins

Planning ✍️ : This one comes in under challenges and wins! While getting the right answer took some time, spending our Day 1 on planning alone meant we made a strong start and finished the backend in two days.

Features ✨: I'm very happy with the amount of work we got done in 9 days. The app offers tons of functionality whilst still having a strong user journey.

Styling 📱: The app is slick and responsive, something we were very keen on achieving since Hiking websites don't usually have "beautiful" styling.

## Key Learnings

* When to use Embedded vs Referenced data
* How to use callback function & ComponentDidUpdate in React
* How to working with a team member who works in a different time-zone - something that is very much possible as companies move towards remote working.

## Future Improvements

- Creating Group seeds with Group members: A challenge I wanted to solve but we ran out of time.
- Events Page Styling: Make this inline-with other pages
- Error Handling on the frontend
