import styles from '../styles/History.module.css';
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { searchHistoryAtom } from "../store";
import { Button, Card, ListGroup } from 'react-bootstrap';
import { removeFromHistory } from '../lib/UserData';

export default function History()
{
    const [ searchHistory, setSearchHistory ] = useAtom(searchHistoryAtom);
    const router = useRouter();
    if(!searchHistory) return null;

    let parsedHistory = [];
    
    searchHistory.forEach(h => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
    });

    function historyClicked(e, index)
    { 
       router.push(`/artwork?` + searchHistory[index])
    }

    async function removeHistoryClicked(e, index)
    {
        e.stopPropagation();
        setSearchHistory(await removeFromHistory(searchHistory[index]))
         
    }

    if(parsedHistory.length == 0)
    {
        return(
            <Card>
            <Card.Body><h4>Nothing Here</ h4> Try Searching for some artwork</Card.Body>
          </Card> 
        )
    }
    else{
    
        
        return(
            <ListGroup>
                {parsedHistory.map((historyItem, index) => (
                     <ListGroup.Item key={index} onClick={e => historyClicked(e, index)} className={styles.historyListItem}>
                     {Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}
                     <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                     </ListGroup.Item>
                ))}
             
            </ListGroup>
            )

    }

}
