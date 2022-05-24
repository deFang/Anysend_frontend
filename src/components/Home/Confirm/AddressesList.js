import React, { useEffect } from 'react'
import { useAuth } from 'contexts/AuthContext';
import { Tbody, Tr,Td 
} from '@chakra-ui/react'
import {BigNumber, ethers} from "ethers";
import {formatFixed, parseFixed} from "@ethersproject/bignumber";

export default function AddressesList() {
    const { isPro, amount, addresses, setAmount } = useAuth()
    useEffect(() => {
        let isConnected = false;
        if(!isConnected && isPro) {
            let _amount = BigNumber.from(0);
            let _subAmount;
            for(let i=0; i<addresses.length; i++) {
                _subAmount = parseFixed(addresses[i][1], 18);
                _amount = _subAmount.add(_amount);
            }
            setAmount(formatFixed(_amount, 18))
        }
    
        return () => {
            isConnected = true;
        }
    }, [addresses, isPro, setAmount])
    

    if(addresses) {
        const addrArr = addresses.map((_addr, index)=>(
            <Tr key={index}>
                <Td >{isPro? _addr[0] : _addr}</Td>
                <Td isNumeric>{isPro ? _addr[1] : amount}</Td>
            </Tr>
        ))
        return <Tbody>{addrArr}</Tbody>
    } 
    return null;
}
