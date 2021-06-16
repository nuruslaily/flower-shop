import React, { Component } from 'react'
import axios from 'axios';
import PostKeranjang from './PostKeranjang';
import firebase from 'firebase';
import firebaseConfig from '../firebase/firebaseConfig';
// import swal from 'sweetalert';

export default class ProdukUser extends Component {

    constructor(props) {
        super(props)

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app(); // if already initialized, use that one
        }

        this.state = {
            keranjangs: [],
            user: {},
            keranjangUser: [],
            newProdukData: {
                nama_bunga: "",
                gambar: "",
                jenis_bunga: "",
                harga: "",
            },
            showModal: false
        }
    }

    authListener() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user
                })
                console.log("User adalah : " + user.email)
            }
            else {
                this.setState({
                    user: null
                })
            }
        })
    }

    componentDidMount() {
        this.authListener();
        this.getKeranjang();
    }

    getKeranjang() {
        axios.get("http://localhost:8000/api/keranjangs").then((response) => {
            if (response.status === 200) {
                this.setState({
                    keranjangs: response.data.data ? response.data.data : [],
                });
                console.log(this.state)
            }
            if (
                response.data.status === "failed" &&
                response.data.success === false
            ) {
                this.setState({
                    noDataFound: response.data.message,
                });
            }
        });
    }

    deleteKeranjang = (id) => {
        console.log("Id nya:" + id);
        axios
            .delete("http://localhost:8000/api/keranjang/" + id)
            .then((response) => {
                this.setState({
                    isLoading: false,
                });
                this.getKeranjang();
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                });
            });
    };

    render() {
        var no = 0;
        var total = 0;
        return (
            <div className="produkAdmin">
                <div className="card-keranjang">
                    <div className="tabel-data">
                        <table border="1" cellPadding="5" width="100%">
                            <tr>
                                <th>No</th>
                                <th>Nama Bunga</th>
                                <th>Gambar</th>
                                <th>Jenis Bunga</th>
                                <th>Harga</th>
                                <th>Qty</th>
                                <th>Sub-Total</th>
                                <th>Opsi</th>
                            </tr>
                            {
                                this.state.keranjangs
                                    .filter(produk => produk.uid === this.state.user.uid)
                                    .map(filtered => {
                                        no += 1;
                                        total += filtered.harga * filtered.qty
                                        return (
                                            <PostKeranjang
                                                no={no}
                                                id={filtered.id}
                                                nama_bunga={filtered.nama_bunga}
                                                gambar={filtered.gambar}
                                                jenis_bunga={filtered.jenis_bunga}
                                                harga={filtered.harga}
                                                qty={filtered.qty}
                                                hapus={this.deleteKeranjang}
                                            />
                                        )
                                    })
                            }
                            <tr>
                                <td colSpan="7" align="right">Total : </td>
                                <td align="center">{total}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
