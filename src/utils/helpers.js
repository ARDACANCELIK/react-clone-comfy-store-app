//51 

export const formatPrice = (number) => {
    const newNumber = Intl.NumberFormat("en-US",{
        style:"currency",
        currency:"USD"
    }).format(number/100)
    
    return newNumber
}
//end of 51 - then now it is time for fetching single product 

//103 - ardından cetegorisi yapacağız  filters.js  git  categorileri displaya başlayacağız 
export const getUniqueValues = (data,type) => {
    let unique = data.map((item)=>item[type])
    // console.log(unique);
    //colors array içi array o yüzden 
    if (type==="colors"){
        // we will get that array instead of array of array 
        unique=unique.flat()
    }
    return ["all",...new Set(unique)]
}
