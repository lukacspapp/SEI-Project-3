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
- JSON Web Token
- date-fns
- Animate.css

# Tokenizer

A MERN-Stack NFT E-commerce app. Users can view, buy and upload their own NFT. Once a user is registered they can upload and edit their NFT. All NFTs have their own price charts so users can follow the price fluctuations of all NFTs.

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

We decided to build the backend together. One person was sharing the screen and the other two guided the coding person. The backend part took three full days to build out and each member of the group coded for one day during that time. For the frontend we used [<img src="https://cdn.worldvectorlogo.com/logos/asana-logo.svg" width='20px'  />](https://app.asana.com/) [Assana](https://app.asana.com/) to plan out responsibilities for each member.

<img src="https://i.imgur.com/nlJIZIj.png" />

### Wireframe

We planned out the basic look of tha application on [<img src="https://i.imgur.com/z3sAHmM.png" width='20px'  />](https://jamboard.google.com/d/1zeemytBD6dOylNV8AHH5jVvw1_8ZdwcZpfOF2kf9Lbo/viewer) Jamboard 

<img src="https://i.imgur.com/9eunZc0.png" alt="lukacs" width="400" /> <img src="https://i.imgur.com/BZ9SWq0.png" alt="gayatry" width="400" /> <img src="https://i.imgur.com/65ruUj0.png" alt="ricardo" width="400" /> <img src="https://i.imgur.com/xxzKnoy.png" alt="lukacs" width="400" />

# Process

Each morning at 10 we jumped on Zoom and had a stand-up. After the stand-up, Zoom would be just open in the background in case anyone needed help. We also communicated through Slack in case anyone needed an image, video, or any links.

As each of us had our Backend areas to work on, we first planned out what models, controllers & routes each of us will be writing before moving on to the code session. We also decided on which aspects of our models will be embedded or referenced.

Our notes are outlined in the next section with code examples.

## Backend (Day 1 to 3)

> **Lukacs**:
>
>  Responsible for building out the models and seeding 


> **Gayatri**:
> 
> Responsible for building out the controllers and seeding


> **Ricardo**:
> 
> Responsible for working out how to remove items from the cart. (checkout and delete)





We had a strong start as the three of us finished the Backend by the end of Day 3. We also troubleshot bugs together on Day 3.

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


## Frontend and Seeding (Day 4 to 9)

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

The home page displays a carousel of four images with dotted design provided by Semantic UI React and also two buttons once that leads the user to [Register Page](https://tokenizer-nft.herokuapp.com/register) and once that leads to the [Browse page](https://tokenizer-nft.herokuapp.com/browse). For the animation of the website, I used [animate.css](https://animate.style/). The carousel was designed by me and Gayatri.

Just as I did in Project-2, on load the index page triggers the getData function that makes the request to the API with Axios and sets the data to a state.
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
  
 Once the data is returned I am using <code>.filter</code> array method to return information about the first items for the carousel.
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


### Browse Page - [Component](https://github.com/lukacspapp/SEI-Project-3/blob/main/front-end/src/components/ProductIndex.js)

<img src='https://i.imgur.com/s5B3yYy.png'>

There were two filters on the browse page which I pair coded with Ricardo.

 The <code>handleDropDownCaegory</code> function is sorting by category,

```
const handleDropDownCategory = (_event, data) => {
    if (!data.value) {
      setFilteredNfts([...nft])
    } else {
      const filterArray = nft.filter(nft => {
        return nft.category === data.value
      })
      setFilteredNfts(filterArray)
    }
  }
 ```
 and the <code>handleDropDownPrice</code> function is sorting the nfts by price.
 
 ```
 const handleDropDownPrice = (_event, data) => {
    const workingArray = [...filteredNfts]
    if (data.value === 1) {
      const sortedArray = workingArray.sort((a, b) => a.currentPrice - b.currentPrice)
      setFilteredNfts(sortedArray)
    } else if (data.value === 2) {
      const sortedArray = workingArray.sort((a, b) => b.currentPrice - a.currentPrice)
      setFilteredNfts(sortedArray)
    } else setFilteredNfts([...nft])
  }
  ```
  
  
  The functions are implemented in the component like this:
  
  ```
   <Container className='animate__animated animate__slideInLeft' >
    <Menu compact style={{ margin: '10px 0em' }}>
      <Dropdown placeholder='By Category' clearable onChange={handleDropDownCategory} options={category} simple item />
     </Menu>
     <Menu compact>
       <Dropdown placeholder='By Price' clearable onChange={handleDropDownPrice} options={options} simple item />
     </Menu>
    </Container>
   ```
  
  
The background music was implemented by Ricardo secretly just before the presentation. All credits to him for that 🙌
 
 ### Footer - [Component](https://github.com/lukacspapp/SEI-Project-3/blob/main/front-end/src/components/Footer.js)

 <img src='https://i.imgur.com/Ehj72KV.png'>

  Other than working on the footer I also implemented design elements to the add NFT page, Login page, and the Register page. 



### Seeding 

All three of us added 20 NFTs each to the initial database throughout the 9 days mostly sourced from [<img src='https://www.svgrepo.com/show/331457/kraken.svg' width='20px' > Kraken](https://www.kraken.com/en-gb/)


## Challenges

**Planning**:

Semantic UI React - While we did a great job planning as a team, it was definitely challenging to learn a new CSS framework in such a short period of time but we were glad we did as it turned out to be a big win.

The clearing [Cart Method](https://github.com/lukacspapp/SEI-Project-3/blob/main/controllers/users.js) - This was definitely a big challenge for the team and Ricardo rewrote the backend part with two methods from Mongoose.

One is the <code>$pull</code>
```
export const removeOneFromCart = async (req,res) => {
  try {
    const { item }  = req.body
    const user = await User.findById(req.currentUser._id)
    if (!user) throw new Error()
    const updatedCart = await User.findOneAndUpdate(
      { _id: req.currentUser._id },
      { $pull: { 'cart': { 'item': item._id } } },
      { returnDocument: 'after' }
    )
    return res.status(202).json(updatedCart)
  } catch (error) {
    console.log(error)
    return res.sendStatus(404)
  }
}
```
The Other is the <code>$set</code> which sets the cart array to be empty 



```
export const clearCart = async (req,res) => {

  try {
    const user = await User.findById(req.currentUser._id)
    if (!user) throw new Error()
    const updatedUser = await User.findByIdAndUpdate(req.currentUser._id,
      { $set: { 'cart': [] } },
      { multi: true,returnDocument: 'after' }
    )
    return res.status(202).json(updatedUser)  
  } catch (error) {
    console.log(error)
    return res.sendStatus(404)
  }
}
```


## Wins

Planning ✍️: This one comes in under challenges and wins! While getting the right answer took some time, spending our Day 1 on planning alone meant we made a strong start and finished the backend in two days.

Reading 📕 : Learning reading documentation for the Semantic UI and Mongoose.

Features ✨: I'm very happy with the amount of work we got done in 9 days. The app offers much functionality whilst still having a strong user journey.

Styling 🤩: The app has a slick design, something I was very keen to achieve was a modern, professional-looking website with nice color.

## Key Learnings

* When to use Embedded vs Referenced data.
* Learning to read the documentation.
* How to be working in a team while managing time.

## Future Improvements

- Make all the pages responsive.
- Adding a package for picture uploading so users can upload images from their device.
- Error handling on the frontend.
