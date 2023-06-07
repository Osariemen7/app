import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Vector from './images/Vector.svg';

let pane= JSON.parse(localStorage.getItem("user"));
let name = pane.pan.name
let tota = pane.pan.tota
let total = (tota).toLocaleString('en-US')
let payment_amount = pane.clickedItem
let payment_frequency = pane.often
let assets =pane.pan.assets 
let refresh = pane.pan.refresh
const Select =()=> {
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
  let thirty =parseInt(tota)* 30/100
  console.log(thirty)
  let seventy = tota - thirty
  let interest = seventy * 2/100
  const currentDate = new Date()
  const targetAmount = thirty
  const FrequentSavings = payment_amount;
  const remain = Math.ceil(targetAmount - FrequentSavings) / FrequentSavings
  let repayment_mat =new Date(currentDate.setMonth(currentDate.getMonth() + remain));
  let funding_date = (repayment_mat).toLocaleDateString('en-GB')
  const remains = Math.ceil(seventy - FrequentSavings) / FrequentSavings
  let repayment_mature = new Date(currentDate.setMonth(currentDate.getMonth() + remains));
  let repayment_maturity =(repayment_mature).toLocaleDateString('en-GB')
  
  async function agree(e) {
    e.preventDefault();
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
      console.warn(name, payment_amount, payment_frequency, repayment_maturity, funding_date, assets)
      let project = {name, payment_amount, payment_frequency, repayment_maturity, funding_date, assets};
      let result = await fetch ('https://sandbox.prestigedelta.com/createproject/',{
          method: 'POST',
          headers:{
            'Authorization': `Bearer ${bab}`,
            'Content-Type': 'application/json',
            'accept' : 'application/json'
       },
       body:JSON.stringify(project)
      });
      if (result.status !== 200) {
        setMessage("Invalid Information");
      } else {
        result = await result.json();
      localStorage.setItem('user-info', JSON.stringify(result)) 
      navigate('/components/pro')
      }
    }
 console.log(pane)
  return(
        <div>
           <Link to='/components/frequent'><i class="fa-solid fa-chevron-left bac"></i></Link>
            <h4>{name}</h4>
            <p className='rp'>Estimated Project amount</p>
            <h1 className='rh'>₦{total}</h1>
            <div className='rev'>
                <p>Saving target</p>
             <p className='revp'>{thirty}</p>
            </div>
            <div className='rev'>
                <p>Recuring Savings</p>
                <p>₦{payment_amount}/{payment_frequency}</p>
            </div>
            <div className='rev'>
                <p>Amount to be loan</p>
                <p>₦{seventy}</p>
            </div>
            <div className='rev'>
                <p>Interest value</p>
                <p className='revp'>₦{interest}(2%p.a)</p>
            </div>
            <div className='rev'>
                <p>Est. Maturity date</p>
                <p>{funding_date}</p>
            </div>
            <div className='revd'>
                <p>Est. Repayment date</p>
                <p>{repayment_maturity}</p>
            </div>
            <div className='dflex'>
            <img src={Vector} alt=''/>
                <p className='rp'>Maturity date may depend on your ability to make the payment on schedule</p>
            </div>
            <div className="message">{message ? <p>{message}</p> : null}</div>
            <button onClick={agree} className='but1'>Agree & Continue</button>
          <Link to='/components/createp'><button className='but2'>Start over</button></Link>  
        </div>
    )
}
export default Select