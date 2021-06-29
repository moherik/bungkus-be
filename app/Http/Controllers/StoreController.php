<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCreateRequest;
use App\Http\Requests\StoreUpdateRequest;
use App\Http\Resources\MenuCategoryCollection;
use App\Http\Resources\StoreCollection;
use App\Http\Resources\StoreResource;
use Inertia\Inertia;
use App\Models\Store;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use Intervention\Image\Facades\Image;

class StoreController extends Controller
{
    public function index()
    {
        return Inertia::render('Store/Index', [
            'filters' => Request::all('search', 'trashed'),
            'stores' => new StoreCollection(
                Auth::user()->stores()
                    ->orderBy('name')
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }

    public function create()
    {
        return Inertia::render('Store/Create');
    }

    public function store(StoreCreateRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('brand_img')) {
            $brandImage = $this->uploadImage($request->file('brand_img'));
            $data['brand_img'] = $brandImage->filename;
        }

        if ($request->hasFile('banner_img')) {
            $bannerImage = $this->uploadImage($request->file('banner_img'), null, 600, 200);
            $data['banner_img'] = $bannerImage->filename;
        }

        $store = Auth::user()->stores()->create($data);
        $store->menuCategories()->create([
            'name' => 'Menu Rekomendasi',
            'order' => 1,
            'is_show' => 0
        ]);

        return Redirect::back()->with('success', 'Toko baru berhasil ditambahkan.');
    }

    public function detail(Store $store)
    {
        return Inertia::render('Store/Detail', [
            'store' => new StoreResource($store),
            'menuCategories' => new MenuCategoryCollection(
                $store->menuCategories),
                
        ]);
    }

    public function update(Store $store, StoreUpdateRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('brand_img')) {
            $brandImage = $this->uploadImage($request->file('brand_img'));
            $data['brand_img'] = $brandImage->filename;
        }

        if ($request->hasFile('banner_img')) {
            $bannerImage = $this->uploadImage($request->file('banner_img'), null, 600, 200);
            $data['banner_img'] = $bannerImage->filename;
        }

        $store->update($data);

        return Redirect::back()->with('success', 'Toko berhasil diubah.');
    }

    public function updateStatus(Store $store, $status)
    {
        $store->update([
            'is_open' => (int)filter_var($status, FILTER_VALIDATE_BOOLEAN)
        ]);

        return Redirect::back();
    }

    public function destroy(Store $store)
    {
        $store->delete();

        return Redirect::back()->with('success', 'Toko berhasil dihapus.');
    }

    public function restore(Store $store)
    {
        $store->restore();

        return Redirect::back()->with('success', 'Toko berhasil dikembalikan.');
    }

    private function uploadImage($file, $filename = null, $width = 200, $height = 200, $format = 'jpg')
    {
        if ($filename == null) {
            $filename = 'upload/' . pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME) . time();
        }
        return Image::make($file)->fit($width, $height)->save($filename, 60, $format);
    }
}
