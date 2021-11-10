import React from 'react'
import { Card, Icon, Image, Label } from 'semantic-ui-react'
import { format } from 'date-fns'


const ProductCard = ({ index, item }) => {

  const transactions = item.transactions
  const date = new Date(transactions.slice(-1)[0].createdAt)
  const formattedDate = format(date, 'dd MMMM yy H: mm')
  const transactionText = transactions.slice(-1)[0].type
  const formattedText = transactionText.charAt(0).toUpperCase() + transactionText.slice(1)
  
  return (
    <Card key={index}>
      <Image
        src={item.image}
        rounded
        size='medium'
      />
      <Card.Content>
        <Card.Header>{item.name}</Card.Header>
        <Card.Meta>{item.category}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Label>
          <Icon name='barcode' />
          <Label.Detail>Last transaction: {formattedText} at {formattedDate}</Label.Detail> 
        </Label>
      </Card.Content>
    </Card>
  )
}

export default ProductCard