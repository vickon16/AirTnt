import Container from '@/components/Container';
import ListingDetails from '@/components/listings/ListingDetails';
import React from 'react'

interface IParams {
  listingId? : string;
}

const ListingPage = async ({params} : {params : IParams}) => {
  if (!params.listingId) return;
  
  return (
    <Container>
      <ListingDetails listingId={params.listingId} />
    </Container>
  )
}

export default ListingPage