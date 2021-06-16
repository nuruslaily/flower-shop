<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produk extends Model
{
    protected $fillable = [
        "nama_bunga", "gambar", "jenis_bunga", "harga"
    ];
}
