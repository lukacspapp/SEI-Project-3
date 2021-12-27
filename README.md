# General Assembly Project 3 - Tokenizer [<img src="https://i.imgur.com/aDlFCzn.png" width='30px'  alt="tokenizer">](https://tokenizer-nft.herokuapp.com/)

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

We have decided to build the backend together. One person was sharing screen and the other two guided the coding person. The backend part took three full days to build out and each member of the group coded for one day during that time. For the frontend we used [<img src="https://cdn.worldvectorlogo.com/logos/asana-logo.svg" width='20px'  />](https://app.asana.com/) Assana to plan out responsibilities for each member.

<img src="https://i.imgur.com/nlJIZIj.png" />

### Wireframe

We planned out the basic look of tha application on [<img src="https://i.imgur.com/z3sAHmM.png" width='20px'  />](https://jamboard.google.com/d/1zeemytBD6dOylNV8AHH5jVvw1_8ZdwcZpfOF2kf9Lbo/viewer) Jamboard 

<img src="https://i.imgur.com/9eunZc0.png" alt="lukacs" width="400" /> <img src="https://i.imgur.com/BZ9SWq0.png" alt="gayatry" width="400" /> <img src="https://i.imgur.com/65ruUj0.png" alt="ricardo" width="400" /> <img src="https://i.imgur.com/xxzKnoy.png" alt="lukacs" width="400" />

# Process

As each of us had our Backend areas to work on, we first planned out what models, controllers & routes each of us will be writing before moving on to the code session. We also decided on which aspects of our models will be embedded or referenced.

Our notes are outlined in the next section with code examples.

## Backend (Day 1 to 3)

We had a strong start as the three of us finished the Backend by the end of Day 3. On Day 2, We worked on our models, controller and routes. On Day 3, we troubleshooted bugs together.

### Models


> **NFT**:
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


### Controllers


> Create, Read, Update and Delete Methods were written for:

> - [Nfts](https://github.com/lukacspapp/SEI-Project-3/blob/main/controllers/nfts.js)
> - [Users](https://github.com/lukacspapp/SEI-Project-3/blob/main/controllers/users.js)


## Frontend (Day 4 to 8)

On day 4, we moved on to Frontend. After setting up the React App, installing HTTP proxy middleware and Nodemon, we began our work.

> **Lukacs**:
> 
> - [Home page](https://tokenizer-nft.herokuapp.com/), [Browser page](https://tokenizer-nft.herokuapp.com/browse), [Footer](https://tokenizer-nft.herokuapp.com/) and theme of the website

> **Gayatri**:
> 
> - [Login page](https://tokenizer-nft.herokuapp.com/login), [Register page](https://tokenizer-nft.herokuapp.com/register), [Add your NFT page](https://tokenizer-nft.herokuapp.com/profile/add)

> **Ricardo**:
> 
> - [NFT detail page](https://tokenizer-nft.herokuapp.com/browse/61ba59098fedecfda8f922d2) and the functionality of the [Cart page](https://tokenizer-nft.herokuapp.com/cart). 





For the theme of the website I got the inspiration from [<img src='https://www.svgrepo.com/show/331457/kraken.svg' width='20px' > Kraken](https://www.kraken.com/en-gb/)   



### Home Page - [Component](https://github.com/lukacspapp/SEI-Project-3/blob/main/front-end/src/components/Home.js)


<img src="https://i.imgur.com/qlCRYXF.png" alt="login-page" />

The home page displays a carousel of four images with dotted design provided by Semantic UI React and also two buttons once that leads the user to [Register Page](https://tokenizer-nft.herokuapp.com/register) and once that leads to the [Browse page](https://tokenizer-nft.herokuapp.com/browse). For the animaton of the website I used [animate.css](https://animate.style/). The carousel was designed by me and Gayatri.

Just as I did in Porject-2, on load the index page triggers the getData function that makes the request to the API with axios and sets the data to a useState.
```
 useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/all')
        if (!data) throw new Error()
        setNftData(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])
  ```
  
 Once the data is returned I am using <code>.filter</code> array method to return the first 4 images for the carousel.
```
{nftData.filter((_item, index) => index < 4).map((product, index) => {
                      return (
                        <>
                          <Slide key={index}>
                            <Card as='a' href={`/browse/${product._id}`}>
                              <Image src={product.image}></Image>
                              <Card.Content>
                                <Card.Header>{product.name}</Card.Header>
                              </Card.Content>
                              <Card.Content extra>
                                <Label>
                                  <Icon name='bitcoin'/>Price: {product.currentPrice}
                                </Label>
                              </Card.Content>
                            </Card>
                          </Slide>
                          <Divider />
                        </>
                      )
                    })}
```                    




    

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
