import React from 'react'
import {
    FormControl, FormLabel, Textarea, Tooltip, Grid, GridItem, Button
} from '@chakra-ui/react'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import { FaFileCsv } from "react-icons/fa"
import { BsBookmarks } from "react-icons/bs"
import CSVUpload from './CSVUpload'
import { useAuth } from 'contexts/AuthContext'

export default function Addresses() {

  const { setAddresses, isUpload, setIsUpload, isPro} = useAuth()

  const handleChange = (e) => {
    setAddresses(e.target.value)
  }

  const handleClick = () => {
    setAddresses(undefined)
    setIsUpload(!isUpload)
  }

  return (
    <>
    <FormControl mt="4">
      <Grid templateColumns='repeat(5, 1fr)' gap={4}>
        <GridItem colSpan={4}>
          <FormLabel htmlFor='addresses'>
            Addresses
            <Tooltip label='Max 255 Addresses Allowed' fontSize='sm' rounded="md">
              <InfoOutlineIcon ml="2"/>
            </Tooltip>
          </FormLabel>
        </GridItem>
        <GridItem colSpan={1} display='flex' alignItems='flex-end' justifyContent='flex-end'>
          <Button variant="unstyled" onClick={handleClick} 
          rightIcon={isUpload ? <FaFileCsv /> : <BsBookmarks />}
          _focus={{
            outline: "none"
          }}
          pb="4"
          >
            {isUpload ?
            "Direct Input"
            :
            "Upload File"
            }
          </Button>
        </GridItem>
      </Grid>
      { isUpload ?
      <CSVUpload />
      :
      isPro ?
      <Textarea id='addresses' type='text' w={{base:'100%', lg:"688px"}} h='158px' rows="5" backgroundColor="#E5E5E5"
      _placeholder={{color: "gray.500"}} color="black" onChange={handleChange} multiline="true"
      placeholder=
        '0x83d1480648DdbEE02508c7dbb38a5a4618e525B8, 10
0x807193B15A15CfE142C89DD7135b9a3055848Dc9, 20
0x65AC552E3F44f4AE9fbBeef0486ED651129cD7eA, 30
        '
      />
      :
      <Textarea id='addresses' type='text' w={{base:'100%', lg:"688px"}} h='158px' rows="5" backgroundColor="#E5E5E5"
      _placeholder={{color: "gray.500"}} color="black" onChange={handleChange} multiline="true"
      placeholder=
        "0x83d1480648DdbEE02508c7dbb38a5a4618e525B8
0x807193B15A15CfE142C89DD7135b9a3055848Dc9
0x65AC552E3F44f4AE9fbBeef0486ED651129cD7eA
        "
      />
      }
      
    </FormControl>
    </>
  )
}
