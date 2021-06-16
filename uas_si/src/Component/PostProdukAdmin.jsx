import React from 'react';
import swal from 'sweetalert';

const PostProdukAdmin = (brg) => {

    return (
        <tr>
            <td align="center">{brg.no}</td>
            {/* <td align="center">{brg.id}</td> */}
            <td align="center">{brg.nama_bunga}</td>
            <td align="center"><img src={brg.gambar} alt="gambar" width="150" height="150" /></td>
            <td align="center">{brg.jenis_bunga}</td>
            <td align="center">{brg.harga}</td>
            <td align="center">
                <button id="btn-edit" onClick={() => brg.update(brg.id, brg.nama_bunga, brg.gambar, brg.jenis_bunga, brg.harga)}>Edit</button><br /><br />
                <button id="btn-delete" onClick={() => 
                    swal({
                        title: "Apa kamu yakin?",
                        text: "Produk akan dihapus!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                        .then((willDelete) => {
                            if (willDelete) {
                                brg.hapus(brg.id);
                                swal("Produk berhasil dihapus!", {
                                    icon: "success",
                                });
                            } // else {
                            //     swal("Your imaginary file is safe!");
                            // }
                        })
                    }>Delete</button>
            </td>
        </tr>
    )
}

export default PostProdukAdmin;