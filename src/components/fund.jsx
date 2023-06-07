import { useState, useEffect } from 'react';
import account_balance from './images/account_balance.svg';
import user from './images/user.svg';
import f123 from './images/f123.svg';
import { Link } from 'react-router-dom'

let tok= JSON.parse(localStorage.getItem("user-info"));
let refresh = tok.refresh_token
 
const FundPage =()=>{
  const [data, setData] = useState('')

  const fetchDat = async () => {
    let item ={refresh}
    let rep = await fetch ('https://sandbox.prestigedelta.com/refreshtoken/',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'accept' : 'application/json'
     },
     body:JSON.stringify(item)
    });
    rep = await rep.json();
    let bab = rep.access_token
  let response = await fetch("https://sandbox.prestigedelta.com/virtualnuban/",{
  method: "GET",
  headers:{'Authorization': `Bearer ${bab}`},
  })
  response = await response.json()
  
 setData(response)
  
}
useEffect(() => {
  fetchDat()
}, [])
console.log(tok)
    return(
        <div >
           <Link to='/components/dash'>
           <i class="fa-solid fa-chevron-left bac"></i>
           </Link> 
            <h1>Fund via bank transfer</h1>
            <p className='dfp2'>To add fund to your prestige account, make a transfer to the account below. Funds should reflect instantly</p>
            <div className="fflex">
                <img src={account_balance} alt=''/>
                <div>
                  <p className='fdiv'>Bank</p>
                  <h3 className='dh3'>{data.bank}</h3>
                </div>   
            </div>
            <div className="fflex">
                <img src={user} alt=''/>
                <div>
                  <p className='fdiv'>Name</p>
                  <h3 className='dh3'>{data.account_name}</h3>
                </div>   
            </div>
            <div className="fflex">
                <img src={f123} alt=''/>
                <div>
                  <p className=''>Account Number</p>
                  <h3 className='dh3'>{data.account_number}</h3>
                </div>   
            </div>
        </div>
    )
}
export default FundPage