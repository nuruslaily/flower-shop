<?php

namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Keranjang extends Model
{
    protected $fillable = [
        "uid", "nama_bunga", "gambar", "jenis_bunga", "harga", "qty"
    ];
}
