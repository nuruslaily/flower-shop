import React, { Component } from 'react'
import axios from 'axios';
import PostProdukUser from './PostProdukUser';
import firebase from 'firebase';
import firebaseConfig from '../firebase/firebaseConfig';
import swal from 'sweetalert';

export default class ProdukUser extends Component {

    constructor(props) {
        super(props)

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app(); // if already initialized, use that one
        }

        this.state = {
            user: {},
            produks: [],
            newKeranjangData: {
                uid: "",
                nama_bunga: "",
                gambar: "",
                jenis_bunga: "",
                harga: "",
                qty: ""
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
        this.getProduk();
    }

    getProduk() {
        axios.get("http://localhost:8000/api/produks").then((response) => {
            if (response.status === 200) {
                this.setState({
                    produks: response.data.data ? response.data.data : [],
                });
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

    // onChangeAddProdukHandler = (e) => {
    //     let { newProdukData } = this.state;
    //     newProdukData[e.target.name] = e.target.value;
    //     this.setState({ newProdukData });
    //     console.log(this.state);
    // };

    addKeranjang = () => {
        axios
            .post(
                "http://localhost:8000/api/create-keranjang",
                this.state.newKeranjangData
            )
            .then((response) => {
                // const { produks } = this.state;
                // const newProduks = [...produks];
                // newProduks.push(response.data);
                this.setState(
                    {
                        newKeranjangData: {
                            uid: "",
                            nama_bunga: "",
                            gambar: "",
                            jenis_bunga: "",
                            harga: "",
                            qty: "",
                        },
                    },
                    () => this.getProduk()
                );
            });
        console.log(this.state);
    };

    handleBeli = (idProduk, uid, nama_bungaP, gambar, jenis_bunga, harga, qty) => {

        this.setState({
            newKeranjangData: {
                ...this.state.newKeranjangData,
                uid: uid,
                nama_bunga: nama_bungaP,
                gambar: gambar,
                jenis_bunga: jenis_bunga,
                harga: harga,
                qty: qty
            },
        }, () => this.addKeranjang()
        );

        // console.log(this.state);

        // if(this.state.newKeranjangData.uid !== ""){ 
        // this.addKeranjang();
        // console.log("Di Add");
        // }
    }

    render() {
        var no = 0;
        return (
            <div className="ProdukUser-page">
                <div className="t-produkUser">
                    <div />
                    <h1>Best Seller</h1>
                    <div />
                </div>
                <div className="produkUser">
                    {
                        this.state.produks.map(produk => {
                            no += 1;
                            return (
                                <PostProdukUser
                                    no={no}
                                    key={produk.id}
                                    uid={this.state.user.uid}
                                    id={produk.id}
                                    nama_bunga={produk.nama_bunga}
                                    harga={produk.harga}
                                    gambar={produk.gambar}
                                    jenis_bunga={produk.jenis_bunga}
                                    tambahProduk={this.handleBeli}
                                // update={this.handleUpdateTelevisi}
                                // hapus={this.deleteProduk}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
