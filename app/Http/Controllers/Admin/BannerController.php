<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BannerController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Banners/Index', [
            'banners' => Banner::orderBy('sort_order')->orderBy('id')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Banners/Create');
    }

    public function edit(Banner $banner)
    {
        return Inertia::render('Admin/Banners/Edit', [
            'banner' => $banner,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'eyebrow' => 'nullable|string|max:255',
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:1000',
            'cta_label' => 'nullable|string|max:255',
            'cta_link' => 'nullable|string|max:255',
            'sort_order' => 'required|integer|min:0',
            'is_active' => 'sometimes|boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        $data['is_active'] = $request->boolean('is_active');

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('banners', 'public');
        }

        Banner::create($data);

        return Redirect::route('admin.banners.index')->with('status', __('messages.banner_created'));
    }

    public function update(Request $request, Banner $banner)
    {
        $data = $request->validate([
            'eyebrow' => 'nullable|string|max:255',
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:1000',
            'cta_label' => 'nullable|string|max:255',
            'cta_link' => 'nullable|string|max:255',
            'sort_order' => 'required|integer|min:0',
            'is_active' => 'sometimes|boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        $data['is_active'] = $request->boolean('is_active');

        if ($request->hasFile('image')) {
            if ($banner->image) {
                Storage::disk('public')->delete($banner->image);
            }

            $data['image'] = $request->file('image')->store('banners', 'public');
        }

        $banner->update($data);

        return Redirect::route('admin.banners.index')->with('status', __('messages.banner_updated'));
    }

    public function destroy(Banner $banner)
    {
        if ($banner->image) {
            Storage::disk('public')->delete($banner->image);
        }

        $banner->delete();

        return Redirect::route('admin.banners.index')->with('status', __('messages.banner_deleted'));
    }

    public function toggleActive(Banner $banner)
    {
        $banner->update(['is_active' => ! $banner->is_active]);

        $label = $banner->is_active ? __('messages.activated') : __('messages.deactivated');

        return back()->with('status', __('messages.banner_status_updated', ['label' => $label]));
    }
}
