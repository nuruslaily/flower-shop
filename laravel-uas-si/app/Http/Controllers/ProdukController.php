<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Produk;

class ProdukController extends Controller
{

    private $status = 200;

    // --------------- [ Save Produk function ] ------------- 
    public function createProduk(Request $request)
    {

        // validate inputs
        $validator = Validator::make(
            $request->all(),
            [
                "nama_bunga"     =>  "required",
                "gambar"         =>  "required",
                "jenis_bunga"    =>  "required",
                "harga"          =>  "required"
            ]
        );

        // if validation fails
        if ($validator->fails()) {
            return response()->json([
                "status" => "failed",
                "validation_errors" => $validator->errors()
            ]);
        }

        $produk_id = $request->id;
        $produkArray = array(
            "nama_bunga"    =>  $request->nama_bunga,
            "gambar"        =>  $request->gambar,
            "jenis_bunga"   =>  $request->jenis_bunga,
            "harga"         =>  $request->harga
        );

        if ($produk_id != "") {
            $produk = Produk::find($produk_id);

            if (!is_null($produk)) {
                $updated_status = Produk::where(
                    "id",
                    $produk_id
                )->update($produkArray);

                if ($updated_status == 1) {
                    return response()->json([
                        "status" => $this->status,
                        "success" => true, "message" => "produk detail updated successfully"
                    ]);
                } else {
                    return response()->json([
                        "status" => "failed",
                        "message" => "Whoops! failed to update, try again."
                    ]);
                }
            }
        } else {
            $produk = Produk::create($produkArray);

            if (!is_null($produk)) {
                return response()->json(["status" => $this->status, "success" => true, "message" => "produk record created successfully", "data" => $produk]);
            } else {
                return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! failed to create."]);
            }
        }
    }


    // --------------- [ Produk Listing ] ------------------- 
    public function produkListing()
    {
        $produk = Produk::all();

        if (count($produk) > 0) {
            return response()->json(["status" => $this->status, "success" => true, "count" => count($produk), "data" => $produk]);
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! no record found"]);
        }
    }

    // --------------- [ Produk Detail ] ---------------- 

    public function produkDetail($id)
    {
        $produk = Produk::find($id);

        if (!is_null($produk)) {
            return response()->json(["status" => $this->status, "success" => true, "data" => $produk]);
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! no produk found"]);
        }
    }

    //---------------- [ Delete Produk ] ---------- 

    public function produkDelete($id)
    {
        $produk = Produk::find($id);

        if (!is_null($produk)) {
            $delete_status = Produk::where("id", $id)->delete();

            if ($delete_status == 1) {
                return response()->json([
                    "status" => $this->status,
                    "success" => true, "message" => "produk record deleted successfully"
                ]);
            } else {
                return response()->json(["status" => "failed", "message" => "failed to delete, please try again"]);
            }
        } else {
            return response()->json(["status" => "failed", "message" => "Whoops! no produk found with this id"]);
        }
    }
}
