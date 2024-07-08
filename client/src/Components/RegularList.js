import React from 'react'
import {Box} from '@mui/material'

const RegularList = React.memo(({items, resourceName, itemComponent: ItemComponent}) => {
    return (
        <>
        <Box display={'flex'}
        flexDirection={"row"}
        flexWrap={'wrap'}
        justifyContent={'space-evenly'}>
        {items.map( (item, i) =>(
           <ItemComponent key={crypto.randomUUID()} item ={item}/>))}
        </Box>
        </>
    )
})

export default RegularList;