import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from '../helpers/axios';
import { API_URL } from '../helpers/constants';

export default function Admin() {

  const [data,setData] = useState([]);
  useEffect(()=>{
    axios.get(API_URL+'/admin/users')
      .then(({data})=>setData(data))
      .catch((e)=>{
        console.log(e.response.data)
      })
  },[]);

  return (
    <Container>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              
              <TableCell>Id</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row=>(
              <TableRow key={`users-list-tr-${row.id}`}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
