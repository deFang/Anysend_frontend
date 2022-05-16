export default function convertStringAmountAddrToArr(_addr) {
    let _arr = _addr.split("\n")
    let _addrAmountArr = [];
    for(let i=0; i<_arr.length; i+=1) {
        let res = _arr[i].split(",")
        _addrAmountArr.push([res[0].trim(), res[1].trim()])
    }
    console.log(_addrAmountArr)
    return _addrAmountArr
}