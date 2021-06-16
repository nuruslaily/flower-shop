import React from 'react'
import swal from 'sweetalert';

export default function PostProdukUser(props) {
    return (
        <div className="PostBunga">
            <div className="konten-bunga">
                <div className="gambar-bunga">
                    <img src={props.gambar} alt="gambar" />
                </div>
                <div className="isi-bunga">
                    <p id="t-jenis-bunga">{props.jenis_bunga}</p>
                    <p id="t-nama-bunga">{props.nama_bunga}</p>
                    <p id="t-harga-bunga">Rp.{props.harga}</p>
                </div>
                <button className="btn-beli-bunga" onClick={() => { props.tambahProduk(props.id, props.uid, props.nama_bunga, props.gambar, props.jenis_bunga, props.harga, 1); swal("Berhasil", "Produk berhasil ditambahkan ke keranjang!", "success") } }>
                    Beli
                </button>
                {/* {console.log(props)} */}
            </div>
        </div>
    )
}
