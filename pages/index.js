import React, { useReducer, useState } from "react";
import Table from '../components/Table';
import Pagination from '../components/Pagination';

import { getPage, getCsv } from "../utils/routes";
import reducer from "../utils/reducer";

import axios from "axios";
const https = require('https');
const instance = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
});

export default function Home({items, pagination}) {
	const [clients, dispatch] = useReducer(reducer, items);
	const [pages, setPages] = useState(pagination);

  async function handleChangePage(url) {
    const {props} = await getPage(url);
    dispatch({type: "fetch", items: props.items});
    setPages(props.pagination);
  }

  async function HandleExport() {
    const response = getCsv();
  }

  return (
    <div className='page'>
      <h1 className='title'>Clients ({pages.totalItems})</h1>
      <hr className='mb-5'></hr>
      <div className='actions'>
        <button onClick={HandleExport} className='btn'>Export csv</button>
      </div>
      <Table items={clients} />

      <Pagination pagination={pages} handleChangePage={handleChangePage} />
    </div>
  )
}

export async function getStaticProps() {
  const props = await getPage("/api/clients?page=1");
  return props;
}