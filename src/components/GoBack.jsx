import React from 'react';
import { useNavigate } from 'react-router-dom';
import {MdOutlineArrowBackIosNew} from 'react-icons/md';
import './GoBack.css';

export default function GoBack() {

    const navigate = useNavigate();

  return (
    <button className="back-btn" onClick={() => navigate(-1)}><MdOutlineArrowBackIosNew/></button>
  )
}
