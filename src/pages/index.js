import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

const ProductTitle = styled.p`
  font-weight: 800;
  font-size: 24px;
`
const ProductsContainer = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto auto;
  width: 100%;
  text-align: center;
`
const ProductCard = styled.div`
  border: 1px solid;
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
const Search = styled.input`
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 50px;
`
const IndexPage = ({ data: { products } }) => {
  const [displayedProducts, setDisplayedProducts] = useState(products.nodes)
  const handleSearch = e => {
    const array = []
    products.nodes.forEach(elem => {
      if (
        elem.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        elem.description.toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        array.push(elem)
      }
    })
    if (!array.length) setDisplayedProducts(products)
    else setDisplayedProducts(array)
  }
  return (
    <div>
      <div>
        <label>Search</label>
        <Search type="text" onChange={handleSearch} />
      </div>
      <ProductsContainer>
        {displayedProducts.length ? (
          displayedProducts.map(product => (
            <ProductCard key={product.name}>
              <ProductImage src={product.image.publicURL} />
              <Link to={`/${product.name.toLowerCase().split(" ").join("-")}/`}>
                <ProductTitle>{product.name}</ProductTitle>
              </Link>
              <ProductDescription>{product.description}</ProductDescription>
              <ProductPrice>{product.price.toFixed(2)}$</ProductPrice>
            </ProductCard>
          ))
        ) : (
          <div>No Products found</div>
        )}
      </ProductsContainer>
    </div>
  )
}

export const query = graphql`
  query {
    products: allProductsJson {
      nodes {
        name
        description
        price
        image {
          publicURL
        }
      }
    }
  }
`

export default IndexPage
