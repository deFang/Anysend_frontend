import React from 'react'
import { Box, Circle, HStack, Center } from '@chakra-ui/react'
import { CheckIcon, MinusIcon } from '@chakra-ui/icons';

export default function ApproveSend(props) {

    const { isApproved, isSent } = props;
    console.log('isApproved', isApproved)
    console.log('isSent', isSent)

    return (
    <Center>
        <HStack  spacing='24px' p={'16px'}>
            <HStack display="flex" alignItems="center" spacing={1} w={'80px'}>
                { isApproved ?
                <Circle p="2" bg="brand.200" w="24px" h="24px">
                    <CheckIcon />
                </Circle>
                :
                <Circle p="2" bg="brand.200" w="24px" h="24px">
                    1
                </Circle>
                }
                <Box >Approve</Box>
            </HStack>
            <HStack display="flex" alignItems="center" spacing={0} w={'40px'}>
                <MinusIcon />
                <MinusIcon />
                <MinusIcon />
            </HStack>
            <HStack display="flex" alignItems="center" spacing={1} w={'80px'}>
            { isSent ?
            <Circle p="2" bg="brand.200" w="24px" h="24px">
                <CheckIcon />
            </Circle>
            :
            <Circle p="2" bg="brand.200" w="24px" h="24px">
                2
            </Circle>
            }
            <Box>Send</Box>
            </HStack>
        </HStack>
    </Center>
    )
}
