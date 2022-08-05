import React from "react"

import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuList
}from "@chakra-ui/react"

export default function NavItem({size,title,icon,active,link}){
    return(
        <Flex
        mt={30}
        flexDir="column"
        w="100%"
        alignItems={size=="small"? "center":"flex-start"}
        >
        <Menu placement="right">
            <Link
            href={link}
            backgroundColor={ size== "large"? active && "#00B83F":null}
            p={3}
            borderRadius={8}
            _hover={size=="large"?{textDecor:"none", backgroundColor:"#00B83F"}:{textDecor:"none"}}
            w={size=="large" && "100%"}
            >
            <MenuButton w="100%">
                <Flex>
                    <Icon as={icon} fontSize="xl" _hover={size=="small"?{color:"#00B83F"}:{textDecor:"none"}} color={ size==="small"?active? "#00B83F": "white":active?"white":"white"}/>
                    <Text ml={5} color="white" display={size==="small"?"none":"flex"}>{title}</Text>
                </Flex>
            </MenuButton>
            </Link>
        </Menu>

        </Flex>
    )
}