import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate"
import './App.css';

function Users() {
  const [data, setData] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0);

  

  useEffect(() => {
    fetch('https://randomuser.me/api/?page=10&results=40&seed=abc')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw response
      })
      .then(data => {
        setData(data);
      })
      .catch(error => {
        setError(error)
      })
      .finally(() => {
         setLoading(false);
          })
      }, [])
    if (error) return "Error!!!"
    if (loading) return "Loading..."
//   const dataList = data.results.map((dataItem) => {
//      return (
//           <div className="card" key= {dataItem.id} >
//              <img  src={dataItem.picture.large}  alt="" />
//              <h1>{dataItem.name.first} {dataItem.name.last}</h1>
//              <p>{dataItem.email}</p>
//              <p>{dataItem.phone}</p>
//         </div>)}); 

  const userPerPage = 8;
  const pageVisted = userPerPage * page
  
  const displayData = data.results
    .slice(pageVisted, pageVisted + userPerPage)
    .map((dataItem) => {
        return (
            <div className="card" key= {dataItem.id} >
               <img  src={dataItem.picture.large}  alt="" />
              <h1>{dataItem.name.first} {dataItem.name.last}</h1>
              <p>{dataItem.email}</p>
              <p>{dataItem.phone}</p>
          </div>
        )
    })
    const pageCount = Math.ceil(data.results.length / userPerPage)
    const changePage = ({ selected }) => {
        setPage(selected);
    }
    return (
      <div>
      <nav>
         <Link to ="/" className="nav">Home</Link>
         <Link to='/products/About' className="nav">About</Link>
         <Link to ="/user" className="nav">Users</Link>
      </nav>
        
        <div>{displayData}</div>
        <ReactPaginate 
         previousLabel= {"Prev"}
         nextLabel= {"Next"}
         pageCount ={ pageCount}  
         onPageChange ={changePage } 
         containerClassName = { "paginationBtns" }
         previousLinkClassName = {"previousBtns"}
         nextLinkClassName = {"nextBtns" }
         disabledClassName ={"paginationDisabled"}
         activeClassName = {"paginationActive"}
        />
      </div>
    );
  }
export default Users;