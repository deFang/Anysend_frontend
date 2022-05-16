import React from 'react'
import { Checkbox, HStack } from '@chakra-ui/react'
import { useAuth } from 'contexts/AuthContext'
import { network } from "../../../services/constants";

export default function DonationBox() {

    const { isChecked, setIsChecked, currentNetwork } = useAuth()

    return (
        <Checkbox isChecked={isChecked} onChange={()=>setIsChecked(!isChecked)}>
            Donate
            {
                network[currentNetwork] == undefined ? "0.001 ETH"
                :
                network[currentNetwork].donation
            }
            to OneClick
        </Checkbox>
  )
}
