import React, { useContext, useState } from 'react'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [ currentAccount, setCurrentAccount] = useState()
    const [ currentNetwork, setCurrentNetwork ] = useState()
    const [ amount, setAmount ] = useState()
    const [ tokenAddress, setTokenAddress ] = useState()
    const [ tokenName, setTokenName ] = useState()
    const [ addresses, setAddresses] = useState()
    const [ isUpload, setIsUpload ] = useState(false)
    const [ isPro, setIsPro ] = useState(false)
    const [ balance, setBalance ] = useState()
    const [ tokenBalance, setTokenBalance ] = useState()
    const [ tokenDecimal, setTokenDecimal ] = useState(18)
    const [ tabIndex, setTabIndex ] = useState(0)
    const [ contractAddr, setContractAddr ] = useState()
    const [ isChecked, setIsChecked ] = useState(false)
    const [ coinPrice, setCoinPrice ] = useState(0)

    const value = {
        currentAccount, setCurrentAccount,
        currentNetwork, setCurrentNetwork,
        amount, setAmount,
        tokenAddress, setTokenAddress,
        tokenName, setTokenName,
        addresses, setAddresses,
        isUpload, setIsUpload,
        isPro, setIsPro,
        balance, setBalance,
        tokenBalance, setTokenBalance,
        tokenDecimal, setTokenDecimal,
        contractAddr, setContractAddr,
        tabIndex, setTabIndex,
        isChecked, setIsChecked,
        coinPrice, setCoinPrice
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
