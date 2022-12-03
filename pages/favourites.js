import { useAtom } from "jotai";
import { favouritesAtom } from "../store";
import Error from "next/error";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { Card, Col, Pagination, Row } from "react-bootstrap";
import useSWR from "swr";
import ArtworkCard from "../components/ArtworkCard";




export default function Favorites()
{
    const [ favouritesList ] = useAtom(favouritesAtom);
    if(!favouritesList) return null;
    
    if(favouritesList == null)
    {
        return(
            <Card>
            <Card.Body><h4>Nothing Here</h4></Card.Body>
          </Card> 
        )
    }
    else if(favouritesList.length > 0 )
    {
        return (
            <>
             <Row className="gy-4">
                    { favouritesList.map((favourite, index) => (
                    <Col lg={3} key={index}><ArtworkCard objectID={favourite}>  
                    </ArtworkCard>
                    </Col>
                     ))}
                
             </Row>
            </>  
        ) 

    }
    else{
        return(
            <Card>
            <Card.Body><h4>Nothing Here</h4>Try adding some new artwork to the list.</Card.Body>
          </Card> 
        )
    }

   
}



