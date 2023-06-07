// import tick from './images/tick.svg';
// import { useNavigate } from 'react-router-dom';

// let pine= JSON.parse(localStorage.getItem("user"));
// let name = pine.name
// let total = pine.total
// const Pro = ()=> {
//     const navigate = useNavigate()
//     const done =(e)=>{
//         e.preventDefault()
//         console.warn(name, total)
//         let dine = {name, total}
//         localStorage.setItem('user-info', JSON.stringify(dine))
//             navigate('/components/project')
//     }
//     return(
//         <div className='tha'>
//            <img src={tick} alt=''/>
//            <h3 className='tp'>Project Created</h3>
//            <p className='tp'>your {name} project has been created successfully</p>
//            <button onClick={done} className='tbut'>Done</button>
//         </div>
//     )
// }
// export default Pro