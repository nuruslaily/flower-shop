<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post("create-produk", "ProdukController@createProduk");

Route::get("produks", "ProdukController@produkListing");

Route::get("produk/{id}", "ProdukController@produkDetail");

Route::delete("produk/{id}", "ProdukController@produkDelete");

Route::post("create-keranjang", "KeranjangController@createKeranjang");

Route::get("keranjangs", "KeranjangController@keranjangListing");

Route::get("keranjang/{id}", "KeranjangController@keranjangByid");

Route::delete("keranjang/{id}", "KeranjangController@keranjangDelete");