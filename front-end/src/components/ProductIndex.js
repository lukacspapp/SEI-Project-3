/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Container, Dimmer, Grid, Loader, Segment, Menu, Dropdown, Icon } from 'semantic-ui-react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'

const ProductIndex = () => {

  const options = [
    { key: 1, text: 'Low to High', value: 1, icon: 'sort amount down' },
    { key: 2, text: 'High to Low', value: 2, icon: 'sort amount up' }

  ]
  const category = [
    { key: 1, text: 'Art', value: 'Art', icon: 'paint brush' },
    { key: 2, text: 'Cards', value: 'Cards' , icon: 'vcard' },
    { key: 3, text: 'Collectibles', value: 'Collectibles', icon: 'briefcase' },
    { key: 4, text: 'Sports', value: 'Sports', icon: 'football ball' },
    { key: 5, text: 'Utility', value: 'Utility', icon: 'game' },
    { key: 6, text: 'Virtual Worlds', value: 'Virtual Worlds', icon: 'computer' }
    
  ]
  const [nft, setNft] = useState([])
  const [filteredNfts, setFilteredNfts] = useState([])
  
  const  handleDropDownCategory = (_event, data) => {
    if (!data.value){
      setFilteredNfts([...nft])
    } else {
      const filterArray = nft.filter(nft => {
        return nft.category === data.value
      })
      setFilteredNfts(filterArray)
    }
  }

  const  handleDropDownPrice = (_event, data) => {
    console.log(data.value)
    const workingArray = [...filteredNfts]
    if (data.value === 1) {
      const sortedArray = workingArray.sort((a,b)=> a.currentPrice - b.currentPrice)
      console.log(sortedArray)
      setFilteredNfts(sortedArray)
    } else if (data.value === 2) {
      const sortedArray = workingArray.sort((a,b) => b.currentPrice - a.currentPrice)
      setFilteredNfts(sortedArray)
    } else setFilteredNfts([...nft])
  }


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/all')
        if (!data) throw new Error()
        setNft(data)
        setFilteredNfts(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])


  return (
    <Container>
      <Segment>
        <h1>Filters</h1><Dropdown placeholder='Categories' fluid multiple selection options={category} />
      </Segment>
      <br/>
      <Grid columns='equal' divided>
        <Grid.Column width={3} textAlign='left'>
          <Container>
            <Grid.Column width={6}>
              <h1 style={{ margin: '10px 0em' }}>Filters <Icon name='filter' size='small'></Icon></h1>
            </Grid.Column>
          </Container>
          <Menu compact style={{ margin: '10px 0em' }}>
            <Dropdown placeholder='By Category' clearable onChange={handleDropDownCategory} options={category} simple item />
          </Menu>
          <Menu compact>
            <Dropdown placeholder='By Price' clearable onChange={handleDropDownPrice} options={options} simple item />
          </Menu>
        </Grid.Column>
        <Grid.Column width={13} color='teal' floated='right' >
          <Card.Group>
            {filteredNfts.length ?
              filteredNfts.map((item, index) => (
                <ProductCard
                  key={index}
                  item={item}
                />
              )
              )
              :
              <Dimmer inverted active>
                <Loader content='Loading' />
              </Dimmer>
            }
          </Card.Group>
        </Grid.Column>
      </Grid>

    </Container>

  )
}
export default ProductIndex