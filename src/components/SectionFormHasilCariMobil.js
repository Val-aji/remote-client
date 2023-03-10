import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SectionFormHasilCariMobil.css";
import axios from "axios"

const SectionFormHasilCariMobil = () => {
  const location = useLocation();
  const currentValues = location.state;
  const initialValues = {
    namaMobil: currentValues.namaMobil,
    kategoriMobil: currentValues.kategoriMobil,
    hargaMobil: currentValues.hargaMobil,
    statusMobil: currentValues.statusMobil,
  };

  const [data, setData] = useState(null)
  const [dataFilter, setDataFilter] = useState([])
  const [values, setValues] = useState(initialValues);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };


  useEffect(() => {

    
    const url = "https://bootcamp-rent-cars.herokuapp.com"
    const config = {
      headers : {
        access_token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJjci5pbyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY2NTI0MjUwOX0.ZTx8L1MqJ4Az8KzoeYU2S614EQPnqk6Owv03PUSnkzc"
      }
    }
    axios
      .get(url+"/admin/car", config)
      .then(res => {
        setData(res.data)
        
      })
      .catch(err => {
        console.log(err)
        
      })
  }, [])

  useEffect(() => {
    if(data) {
        const {namaMobil, kategoriMobil, hargaMobil, statusMobil} = values
          
        const filterData = data.filter(res => {
        
          const filterNama = res.name.toLowerCase().match(namaMobil.toLowerCase())
         
          // const filterKategori = res.category.match(kategoriMobil.toLowerCase())
          const filterKategori = "hello"
          let filterHarga;
          if(hargaMobil === "above400") {
            filterHarga = res.price > 600000
          } else if(hargaMobil === "under400") {
            // lebih kecil
            filterHarga = res.price < 400000
          } else if(hargaMobil === "400600"){
            //antara 400 - 600
            filterHarga = res.price > 400000 && data.price < 400000
          } else {
            filterHarga = !res.price || res.price > 0
          }

          const filterStatus = res.status === statusMobil

          return filterNama && filterKategori && filterKategori && filterStatus
        })         
        
    } 
    
  }, [values,data])

  

  
  const handleSubmit = (e) => {
    e.preventDefault();
    values.statusMobil = values.statusMobil === "true" ? true : false;
    navigate("/hasilcari", { state: { namaMobil: values.namaMobil, kategoriMobil: values.kategoriMobil, hargaMobil: values.hargaMobil, statusMobil: values.statusMobil } });
  };

  return (
    <section id="formPencarianHasilMobil">
      <div className="container">
        <div className="row form-box">
          <div className="col-lg-12">
            <form className="row g-2" onSubmit={handleSubmit}>
              <div className="col-lg">
                <label htmlFor="namaMobil" className="form-label">
                  Nama Mobil
                </label>
                <input id="namaMobil" name="namaMobil" defaultValue={values.namaMobil} onChange={handleInputChange} type="text" className="form-control" aria-describedby="emailHelp" placeholder="Ketik nama/tipe mobil" />
              </div>
              <div className="col-lg">
                <label htmlFor="kategoriMobil" className="form-label">
                  Kategori
                </label>
                <select id="kategoriMobil" name="kategoriMobil" defaultValue={values.kategoriMobil} onChange={handleInputChange} className="form-select" aria-label="Default select example">
                  <option value="default">Masukan Kapasitas Mobil</option>
                  <option value="small">2 - 4 orang</option>
                  <option value="medium">4 - 6 orang</option>
                  <option value="large">6 - 8 orang</option>
                </select>
              </div>
              <div className="col-lg">
                <label htmlFor="hargaMobil" className="form-label">
                  Harga
                </label>
                <select id="hargaMobil" name="hargaMobil" defaultValue={values.hargaMobil} onChange={handleInputChange} className="form-select" aria-label="Default select example">
                  <option value="default">Masukan Harga Sewa per Hari</option>
                  <option value="under400">&#60; Rp. 400.000</option>
                  <option value="400-600">Rp. 400.000 - Rp. 600.000</option>
                  <option value="above600">&#62; Rp. 600.000</option>
                </select>
              </div>
              <div className="col-lg">
                <label htmlFor="statusMobil" className="form-label">
                  Status
                </label>
                <select id="statusMobil" name="statusMobil" defaultValue={values.statusMobil} onChange={handleInputChange} className="form-select" aria-label="Default select example">
                  <option value={true}>Disewa</option>
                  <option value={false}>Free</option>
                </select>
              </div>
              <div className="col-lg-1 submitColumn">
                <button type="submit" className="btn btn-primary buttonSubmit">
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionFormHasilCariMobil;
