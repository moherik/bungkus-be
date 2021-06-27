<?php

namespace App\Http\Controllers;

use App\Http\Requests\MenuStoreRequest;
use App\Http\Requests\MenuUpdateRequest;
use App\Models\Menu;
use App\Models\MenuCategory;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Intervention\Image\Facades\Image;

class MenuController extends Controller
{
    public function storeMenu(MenuStoreRequest $request, $categoryId)
    {
        // dd($request->all());
        $data = $request->validated();
        
        $category = MenuCategory::where('id', $categoryId)->first();
        if($category != null) {
            if($request->hasFile('image')) {
                $image = $this->uploadImage($request->file('image'));
                $data['image'] = $image->filename;
            }
            $category->menus()->create($data);
            return Redirect::back()->with('success', 'Menu baru berhasil ditambahkan.');
        }

        return Redirect::back()->with('error', 'Terjadi kesalahan.');
    }

    public function storeCategory(Store $store, Request $request)
    {
        $maxOrder = (int)MenuCategory::max('order');
        $store->menuCategories()->create([
            'name' => $request->name,
            'order' => $maxOrder+1,
            'is_show' => $this->convertBoolToInt($request->is_show)
        ]);

        return Redirect::back()->with([
            'success' => 'Berhasil menambahkan kategori menu baru.']);
    }

    public function updateMenu(Menu $menu, MenuUpdateRequest $request)
    {
        $data = $request->validated();
        $data["is_show"] = $this->convertBoolToInt($data['is_show']);

        if($request->hasFile('image')) {
            $image = $this->uploadImage($request->file('image'));
            $data['image'] = $image->filename;
        }

        $menu->update($data);

        return Redirect::back()->with('success', 'Menu berhasil diubah.');
    }

    public function updateStatusMenu(Menu $menu, $status)
    {
        $menu->update([
            'is_show' => $this->convertBoolToInt($status)
        ]);
        return Redirect::back();
    }

    public function updateCategory(Request $request, $id)
    {
        MenuCategory::where('id', $id)->update([
            'name' => $request->name,
            'is_show' => $this->convertBoolToInt($request->is_show)
        ]);
        return Redirect::back()->with('success', 'Kategori menu berhasil diubah.');
    }

    public function reorderCategory(Request $request)
    {
        $categories = $request->all();
        foreach($categories as $category)
        {
            MenuCategory::where('id', $category['id'])->update(['order' => $category['order']]);
        }

        return Redirect::back();
    }

    public function reorderMenu(Request $request)
    {
        $menus = $request->all();

        $sourceMenus = $menus["sourceMenus"];
        $destMenus = $menus["destMenus"] ?? null;

        foreach($sourceMenus as $menu)
        {
            Menu::where('id', $menu['id'])->update(['order' => $menu['order']]);
        }

        if(isset($destMenus) && $destMenus != null) {
            foreach($destMenus as $menu)
            {
                Menu::where('id', $menu['id'])->update([
                    'menu_category_id' => $menu['categoryId'],
                    'order' => $menu['order']]);
            }
        }

        return Redirect::back();
    }

    public function destroyMenu(Menu $menu)
    {
        $menu->delete();
        return Redirect::back()->with('success', 'Menu berhasil dihapus.');
    }

    public function destroyCategory($id)
    {
        MenuCategory::where('id', $id)->delete();
        return Redirect::back()->with('success', 'Menu berhasil dihapus.');
    }

    private function uploadImage($file, $filename = null, $width = 200, $height = 200, $format = 'jpg')
    {
        if($filename == null) {
            $filename = 'upload/' . pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME) . time();
        }
        return Image::make($file)->fit($width, $height)->save($filename, 60, $format);
    }

    private function convertBoolToInt($bool)
    {
        return (int)filter_var($bool, FILTER_VALIDATE_BOOLEAN);
    }
}
