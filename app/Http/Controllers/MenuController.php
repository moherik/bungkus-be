<?php

namespace App\Http\Controllers;

use App\Http\Requests\MenuStoreRequest;
use App\Http\Requests\MenuUpdateRequest;
use App\Http\Resources\MenuCollection;
use App\Http\Resources\MenuResource;
use App\Models\Menu;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use Intervention\Image\Facades\Image;

class MenuController extends Controller
{
    public function store(MenuStoreRequest $request)
    {
        $data = $request->validated();

        if($request->hasFile('image')) {
            $image = $this->uploadImage($request->file('image'));
            $data['image'] = $image->filename;
        }

        Auth::user()->menus()->create($data);

        return Redirect::route('menus.create')->with('success', 'Menu baru berhasil ditambahkan.');
    }

    public function update(Menu $menu, MenuUpdateRequest $request)
    {
        $data = $request->validated();

        if($request->hasFile('image')) {
            $image = $this->uploadImage($request->file('image'));
            $data['image'] = $image->filename;
        }

        $menu->update($data);

        return Redirect::back()->with('success', 'Menu berhasil diubah.');
    }

    public function updateStatus(Menu $menu, $status)
    {
        $menu->update([
            'is_show' => (int)filter_var($status, FILTER_VALIDATE_BOOLEAN)
        ]);

        return Redirect::back();
    }

    public function move(Menu $menu, $dest)
    {
        $menu->update([
            'menu_category_id' => $dest
        ]);

        return Redirect::back();
    }

    public function destroy(Menu $menu)
    {
        $menu->delete();

        return Redirect::back()->with('success', 'Menu berhasil dihapus.');
    }

    public function restore(Menu $menu)
    {
        $menu->remenu();

        return Redirect::back()->with('success', 'Menu berhasil dikembalikan.');
    }

    private function uploadImage($file, $filename = null, $width = 200, $height = 200, $format = 'jpg')
    {
        if($filename == null) {
            $filename = 'upload/' . pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME) . time();
        }
        return Image::make($file)->fit($width, $height)->save($filename, 60, $format);
    }
}
