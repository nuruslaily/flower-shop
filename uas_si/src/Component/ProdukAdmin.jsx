import React, { Component } from 'react'
import Modal from 'react-modal';
import axios from 'axios';
import swal from 'sweetalert';
import PostProdukAdmin from './PostProdukAdmin';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '50px 100px 50px 100px'
    }
};

Modal.setAppElement('#root');

export default class ProdukAdmin extends Component {

    constructor(props) {
        super(props)

        this.handleOpenModalAdd = this.handleOpenModalAdd.bind(this);
        this.handleCloseModalAdd = this.handleCloseModalAdd.bind(this);

        this.handleOpenModalEdit = this.handleOpenModalEdit.bind(this);
        this.handleCloseModalEdit = this.handleCloseModalEdit.bind(this);

        this.state = {
            produks: [],
            newProdukData: {
                nama_bunga: "",
                gambar: "",
                jenis_bunga: "",
                harga: "",
            },
            editProdukData: {
                id: "",
                nama_bunga: "",
                gambar: "",
                jenis_bunga: "",
                harga: "",
            },
            showModalAdd: false,
            showModalEdit: false
        }
    }

    componentDidMount() {
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

    onChangeAddProdukHandler = (e) => {
        let { newProdukData } = this.state;
        newProdukData[e.target.name] = e.target.value;
        this.setState({ newProdukData });
        console.log(this.state);
    };

    addProduk = () => {
        axios
            .post(
                "http://localhost:8000/api/create-produk",
                this.state.newProdukData
            )
            .then((response) => {
                const { produks } = this.state;
                const newProduks = [...produks];
                newProduks.push(response.data);
                this.setState(
                    {
                        showModalAdd: false,
                        produks: newProduks,
                        newProdukData: {
                            nama_bunga: "",
                            gambar: "",
                            jenis_bunga: "",
                            harga: "",
                        },
                    },
                    () => this.getProduk()
                );
            });
    };

    deleteProduk = (id) => {
        this.setState({
            isLoading: true,
        });
        axios
            .delete("http://localhost:8000/api/produk/" + id)
            .then((response) => {
                this.setState({
                    isLoading: false,
                });
                this.getProduk();
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                });
            });
    };

    onChangeEditProdukHanler = (e) => {
        let { editProdukData } = this.state;
        editProdukData[e.target.name] = e.target.value;
        this.setState({ editProdukData });
    };

    updateProduk = () => {
        let {
            id,
            nama_bunga,
            gambar,
            jenis_bunga,
            harga,
        } = this.state.editProdukData;
        axios
            .post("http://localhost:8000/api/create-produk", {
                nama_bunga,
                gambar,
                jenis_bunga,
                harga,
                id,
            })
            .then((response) => {
                this.getProduk();
                this.setState({
                    showModalEdit: false,
                    editProdukData: { nama_bunga, gambar, jenis_bunga, harga },
                });
            })
            .catch((error) => {
                this.setState({ isLoading: false })
                console.log(error.response);
            });
    };

    handleOpenModalAdd() {
        this.setState({ showModalAdd: true });
    }

    handleCloseModalAdd() {
        this.setState({ showModalAdd: false });
    }

    handleOpenModalEdit(id, nama_bunga, gambar, jenis_bunga, harga) {
        this.setState({ 
            showModalEdit: true ,
            editProdukData: {
                id: id, 
                nama_bunga: nama_bunga, 
                gambar: gambar, 
                jenis_bunga: jenis_bunga, 
                harga: harga
            }
        });
    }

    handleCloseModalEdit() {
        this.setState({ showModalEdit: false });
    }

    render() {
        var no = 0;

        return (
            <div className="produkAdmin">
                <div className="card">

                    <button onClick={this.handleOpenModalAdd} id="btn-add">Add</button>
                    <div className="tabel-data">
                        <table border="1" cellPadding="5" width="100%">
                            <tr>
                                <th>No</th>
                                <th>Nama Bunga</th>
                                <th>Gambar</th>
                                <th>Jenis Bunga</th>
                                <th>Harga</th>
                                <th>Opsi</th>
                            </tr>
                            {
                                this.state.produks.map(produk => {
                                    no += 1;
                                    return (
                                        <PostProdukAdmin
                                            no={no}
                                            key={produk.id}
                                            id={produk.id}
                                            nama_bunga={produk.nama_bunga}
                                            harga={produk.harga}
                                            gambar={produk.gambar}
                                            jenis_bunga={produk.jenis_bunga}
                                            update={this.handleOpenModalEdit}
                                            hapus={this.deleteProduk} 
                                        />
                                    )
                                })
                            }
                        </table>
                    </div>

                    <Modal
                        style={customStyles}
                        isOpen={this.state.showModalAdd}
                        contentLabel="onRequestClose Example"
                    >
                        <div className="Modal">
                            <h2>Tambah Produk</h2>
                            <p>Nama Bunga</p>
                            <input name="nama_bunga" id="input-nama-modal" type="text" placeholder="Nama bunga" onChange={this.onChangeAddProdukHandler} value={this.state.newProdukData.nama_bunga} /><br />
                            <p>Jenis Bunga</p>
                            <input name="jenis_bunga" type="text" placeholder="Jenis Bunga" onChange={this.onChangeAddProdukHandler} value={this.state.newProdukData.jenis_bunga} />
                            <p>Harga</p>
                            <input name="harga" type="text" placeholder="Harga" onChange={this.onChangeAddProdukHandler} value={this.state.newProdukData.harga} />
                            <p>Gambar</p>
                            <input name="gambar" type="text" placeholder="Gambar" onChange={this.onChangeAddProdukHandler} value={this.state.newProdukData.gambar} />

                            <button id="btn-add-modal" onClick={() => { this.addProduk(); swal("Berhasil", "Produk berhasil ditambahkan ke keranjang!", "success")}} >Tambah</button>
                            <button id="btn-close-modal" onClick={this.handleCloseModalAdd}>X</button>
                        </div>
                    </Modal>

                    <Modal
                        style={customStyles}
                        isOpen={this.state.showModalEdit}
                        contentLabel="onRequestOpen Example"
                    >
                        <div className="Modal">
                            <h2>Edit Produk</h2>
                            <p>Nama Bunga</p>
                            <input name="nama_bunga" id="input-nama-modal" type="text" placeholder="Nama bunga" onChange={this.onChangeEditProdukHanler} value={this.state.editProdukData.nama_bunga} /><br />
                            <p>Jenis Bunga</p>
                            <input name="jenis_bunga" type="text" placeholder="Jenis Bunga" onChange={this.onChangeEditProdukHanler} value={this.state.editProdukData.jenis_bunga} />
                            <p>Harga</p>
                            <input name="harga" type="text" placeholder="Harga" onChange={this.onChangeEditProdukHanler} value={this.state.editProdukData.harga} />
                            <p>Gambar</p>
                            <input name="gambar" type="text" placeholder="Gambar" onChange={this.onChangeEditProdukHanler} value={this.state.editProdukData.gambar} />

                            <button id="btn-add-modal" onClick={() => { this.updateProduk(); swal("Berhasil", "Produk berhasil ditambahkan ke keranjang!", "success") }} >Edit</button>
                            <button id="btn-close-modal" onClick={this.handleCloseModalEdit}>X</button>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}
