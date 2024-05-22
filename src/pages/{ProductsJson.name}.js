import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

const ProductTitle = styled.p`
  font-weight: 800;
  font-size: 24px;
`
const ProductCard = styled.div`
  border: 1px solid;
  text-align: center;
`
const ProductImage = styled.img`
  width: 70px;
  height: 70px;
`
const ProductDescription = styled.p`
  font-weight: 500;
  font-size: 18px;
`
const ProductPrice = styled.p`
  font-weight: 600;
  font-size: 20px;
`

function ProductPage({ data }) {
  return (
    <ProductCard key={data.productsJson.name}>
      <ProductImage src={data.productsJson.image.publicURL} />
      <ProductTitle>{data.productsJson.name}</ProductTitle>
      <ProductDescription>{data.productsJson.description}</ProductDescription>
      <ProductPrice>{data.productsJson.price.toFixed(2)}$</ProductPrice>
    </ProductCard>
  )
}

export default ProductPage

export const query = graphql`
  query ($id: String!) {
    productsJson(id: { eq: $id }) {
      name
      description
      price
      image {
        publicURL
      }
    }
  }
`
