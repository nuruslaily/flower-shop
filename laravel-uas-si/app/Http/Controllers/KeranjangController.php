<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Keranjang;

class KeranjangController extends Controller
{

    private $status = 200;

    // --------------- [ Save Produk function ] ------------- 
    public function createKeranjang(Request $request)
    {

        // validate inputs
        $validator = Validator::make(
            $request->all(),
            [
                "uid"            =>  "required",
                "nama_bunga"     =>  "required",
                "gambar"         =>  "required",
                "jenis_bunga"    =>  "required",
                "harga"          =>  "required",
                "qty"            =>  "required",
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
            "uid"           =>  $request->uid,
            "nama_bunga"    =>  $request->nama_bunga,
            "gambar"        =>  $request->gambar,
            "jenis_bunga"   =>  $request->jenis_bunga,
            "harga"         =>  $request->harga,
            "qty"           =>  $request->qty
        );

        if ($produk_id != "") {
            $produk = Keranjang::find($produk_id);

            if (!is_null($produk)) {
                $updated_status = Keranjang::where(
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
            $produk = Keranjang::create($produkArray);

            if (!is_null($produk)) {
                return response()->json(["status" => $this->status, "success" => true, "message" => "produk record created successfully", "data" => $produk]);
            } else {
                return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! failed to create."]);
            }
        }
    }

    public function keranjangListing()
    {
        $keranjang = Keranjang::all();

        if (count($keranjang) > 0) {
            return response()->json(["status" => $this->status, "success" => true, "count" => count($keranjang), "data" => $keranjang]);
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! no record found"]);
        }
    }

    public function keranjangByid($id)
    {
        $keranjang = Keranjang::find($id);

        if (!is_null($keranjang)) {
            return response()->json(["status" => $this->status, "success" => true, "data" => $keranjang]);
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! no cart found"]);
        }
    }

    //---------------- [ Delete Produk ] ---------- 

    public function keranjangDelete($id)
    {
        $produk = Keranjang::find($id);

        if (!is_null($produk)) {
            $delete_status = Keranjang::where("id", $id)->delete();

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
